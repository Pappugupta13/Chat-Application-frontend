import { useGameContext } from '../context/gameContext';
import { usesocketIoContext } from '../context/socketIo';
import { useState } from 'react';
export const startgame = () => {
    const { game, setGame } = useGameContext();
    const { socket } = usesocketIoContext();
    const { fullName, profilePic, id } = JSON.parse(localStorage.getItem("demo-chat-user"))
    const [isDisabled, setIsDisabled] = useState({
        one: 1,
        two: false,
        three:true
    });
    const clicked = async (n) => {
        isDisabled.three&&setIsDisabled({ ...isDisabled, two: true,three:false});
        // socket?.emit("playGame",{"move":n})
        const square = [...game.board];
        if (game.board[n] !== '') {
            alert('Already Clicked')
            return
        }
        square[n] = game.move;
        const nextMove = game.move === 'X' ? 'O' : 'X';
        setGame({ ...game, board: square, move: nextMove });
        if (isWin(square)) {
            square.fill('');
        }
        if (isDraw(square)) {
            alert("Match Draw")
            square.fill('');
            resetgame();
        }

    }
    const isDraw = (board) => {
        let count = 0;
        board.forEach(element => {
            if (element !== '') {
                count++;
            }
        });
        if (count >= 9) {
            return true;
        } else {
            return false;
        }
    }
    const isWin = (board) => {
        const conditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        let flag = false;
        conditions.forEach(element => {
            if (board[element[0]] !== '' && board[element[1]] !== '' && board[element[2]] !== '') {
                if (board[element[0]] === board[element[1]] && board[element[1]] === board[element[2]]) {
                    setGame({...game,winner:board[element[0]]})
                    flag = true;
                }
            }
        });
        return flag;
    }
    const resetgame = () => {
        setGame({ ...game, board: Array(9).fill(''), move: "X",winner:null})
        setIsDisabled({ ...isDisabled, one: 1, two: false,three:true})
    }
    const changeMove = (newMove) => {
        setGame({ ...game, move: newMove });
    };
const request = ({requestUserId})=>{
    socket?.emit("request",{id:requestUserId,reqName:fullName,profilePic});
}

    return { clicked, isDisabled, setIsDisabled, resetgame, fullName, profilePic,changeMove,request}

}

