import { useGameContext } from '../context/gameContext';
import { usesocketIoContext } from '../context/socketIo';
import { useNavigate } from 'react-router-dom';
import {useState } from 'react';
export const startgame = () => {
    const { game, setGame } = useGameContext();
    const navigate = useNavigate();
    const { socket } = usesocketIoContext();
    const { fullName, profilePic } = JSON.parse(localStorage.getItem("demo-chat-user"));
    const [isDisabled, setIsDisabled] = useState({
        one: 1,
        two: false
    });
   const [opp,setopp] = useState('')
    const clicked = async (n) => {  
        console.log(opp)  
        !isDisabled.two && setIsDisabled({ ...isDisabled, two: true });
        if(game.opponent.id){
            socket?.emit("playGame",{"move":n,opponentid:game.opponent.id})
            setGame(previous=>({...previous,isYourtime:false}))
        }   
        if(!isDisabled.two){
             localStorage.setItem("ftm",game.move)
        }
        const square = [...game.board];
        if (game.board[n] !== '') {
            alert('Already Clicked')
            return
        }
        square[n] = game.move;
        let nextMove = game.move === 'X' ? 'O' : 'X'; 
        setGame((prevGameState) => ({
            ...prevGameState,
            board: [...prevGameState.board].slice(0, n).concat(game.move).concat(...prevGameState.board.slice(n + 1)),
            move: nextMove,
          }));
        if (isWin(square)) {
            square.fill('');
            const ftm = localStorage.getItem("ftm");
            socket?.emit("winordraw",{data:{winner:ftm},id:game.opponent.id})
            if (data?.winner === ftm){
                setGame({...game,winner:fullName})
            }
            else{
             
                setGame({...game,winner:game.opponent.name})
            }
        }
        if (isDraw(square)) {
            alert("Match Draw")
            square.fill('');
            socket?.emit("winordraw",{data:{draw:"yes"},id:game.opponent.id})
            resetgame();

        }
    }
    // check if draw the match
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
    // check if user has won or not 
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
                    setGame({ ...game, winner: board[element[0]] })
                    flag = true;
                }
            }
        });
        return flag;
    }
    // reset the game 
    const resetgame = () => {
        setGame({ ...game,
        board:Array(9).fill(''),
        move:"X",
        winner:null,
        show:true,
        notification:true,
        notifiyUser:[],
        opponent:{name:null,id:null},
        isYourtime:true
         })
        setIsDisabled({ ...isDisabled, one: 1, two: false });
        localStorage.removeItem("ftm")
    }
    // change to move from x to o and viceversa
    const changeMove = (newMove) => {
        setGame({ ...game, move: newMove });
    };
    // someone has requested to join the game 
    const request = ({ requestUserId }) => {
        socket?.emit("request", { id: requestUserId, reqName: fullName, profilePic });
    }
    // either user has accept request or not
    const isAcceptORCancel = async ({ isyes, requesteduserid, opponentName}) => {
        if (isyes === "yes") {
            socket?.emit("isAccept", { istrue: "yes", requesteduserid, Name: fullName });
            const urlPath = window.location.pathname;
            if (urlPath === '/home') {
                navigate('/game');
            }
            // console.log(requesteduserid,)
            // console.log({ requesteduserid,})
            setopp( opponentName)
            setGame({ ...game,board:Array(9).fill(""), notification: false, isYourtime:false,show: false,opponent:{name:opponentName,id:requesteduserid}})
        }
    }
    const isCancel = async ({ isyes,requesteduserid}) => {
        if (isyes === "No") {
            setGame((prevData) => {
                const messageIndex = prevData.notifiyUser.findIndex(item => item.id === requesteduserid);
                console.log(messageIndex)
                if (messageIndex !== -1) {
                    return ({
                        ...prevData,
                        notifiyUser: prevData.notifiyUser.slice(0, messageIndex).concat(prevData.notifiyUser.slice(messageIndex + 1)),
                    });
                }
            })
        }
    }
    //   hide and show the notification panel 
    const hideShow = ({ which }) => {
        if (which === "parent") {
            setGame(prevState => ({ ...prevState, notification: false }))
        }
    }
    return { clicked, isDisabled, setIsDisabled, resetgame, fullName, profilePic, changeMove, request, isAcceptORCancel, hideShow,isCancel}

}

