import React, { useState } from 'react';
import '../cssFile/game.css';
import { useNavigate } from 'react-router-dom';
import SearchUser from './searchUser';
const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [move, setMove] = useState('X');
    const [isDisabled, setIsDisabled] = useState({
        one: 1,
        two: false,
    });
    const [winner, setWinner] = useState(null);
    const userName = JSON.parse(localStorage.getItem('demo-chat-user')).fullName;
    const clicked = (n) => {
        setIsDisabled({...isDisabled,two:true})
        let square = [...board]
        if (board[n] !== '') {
            alert('Already Clicked')
            return
        }
        square[n] = move;
        setBoard(square)
        if (move === 'X') {
            setMove('O')
        } else {
            setMove('X')
        }
        if (isWin(square)) {
            square.fill('');
            setBoard(Array(9).fill(''))

        }
        if (isDraw(square)) {
            alert("Match Draw")
            square.fill('');
            setMove('X');
            setBoard(Array(9).fill(''))
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
                    setWinner(board[element[0]]);
                    flag = true;
                    console.log(board[element[0]])

                }
            }
        });
        return flag;
    }
    const resetgame = () => {
        setBoard(Array(9).fill(''));
        setMove("X");
        setWinner(null);
    }
    const navigate = useNavigate();
    return (
        <>
        <SearchUser/>
        <div className='container-for-game'>
            <div className='child-container-for-game'>
                <span className='tic-tac-toe'>Tic-Tac-Toe</span>
                {winner &&
                    <div className='after-winning-the-game'>
                        <span style={{ fontSize: 20 }}>{winner} opponent won the match</span>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button onClick={e => navigate('/home')}>Go to Chat</button>
                            <button onClick={resetgame}>Start new game</button>
                        </div>
                    </div>}
                {!winner && <>
                    <div className='name-for-game'>
                        <span style={{ marginRight: 10 }}>You: {userName}</span>
                        <span>Opponent: {"Shivansh"}</span>
                    </div>
                    <div className='turn-for-game'>
                        <span>You are playing as <select onClick={e=>{isDisabled.one % 2 === 0?setIsDisabled({...isDisabled,two:true}):setIsDisabled({...isDisabled,one:2})}}  disabled={isDisabled.two} onChange={e=>{setMove(e.target.value)}}>
                            <option value="X" >X</option>
                            <option value="Y">Y</option>
                        </select></span>
                        <span>{move}'s Turn</span>
                    </div>
                    <div className='child-game'>
                        <div className='row'>
                            <div onClick={e => clicked(0)}>{board[0]}</div>
                            <div onClick={e => clicked(1)}>{board[1]}</div>
                            <div onClick={e => clicked(2)}>{board[2]}</div>
                        </div>
                        <div className='row'>
                            <div onClick={e => clicked(3)}>{board[3]}</div>
                            <div onClick={e => clicked(4)}>{board[4]}</div>
                            <div onClick={e => clicked(5)}>{board[5]}</div>
                        </div>
                        <div className='row'>
                            <div onClick={e => clicked(6)}>{board[6]}</div>
                            <div onClick={e => clicked(7)}>{board[7]}</div>
                            <div onClick={e => clicked(8)}>{board[8]}</div>
                        </div>
                    </div>
                </>}
            </div>

        </div>
        </>
    )
}

export default Game
