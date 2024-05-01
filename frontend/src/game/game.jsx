import React,{useState} from 'react';
import '../cssFile/game.css';
const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [move, setMove] = useState('X')
    const clicked = (n)=>{
        let square=[...board]
        if(board[n]!==''){
            alert('Already Clicked')
            return
        }
        square[n]=move;
        setBoard(square)
        if(move==='X'){
            setMove('O')
        }else{
            setMove('X')
        }
        if(isWin(square)){
            alert("Winner")
            square.fill('');
            setBoard(square)
        }  
        if(isDraw(square)){
            alert("Match Draw")
            square.fill('');
            setBoard(square)
        }  

    }
    const isDraw=(board)=>{
        let count=0;
        board.forEach(element => {
            if(element!==''){
                count++;
            }
        });
    
        if(count>=9){
            return true;
        }else{
            return false;
        }
    }
    const isWin=(board)=>{
        const conditions=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        let flag=false;
        conditions.forEach(element => {
            if(board[element[0]]!=='' && board[element[1]]!=='' && board[element[2]]!==''){ 
            if(board[element[0]]===board[element[1]] && board[element[1]]===board[element[2]]){
                flag=true;
            }
        }
        });
        return flag;
    }
    
    return (
        <div className='container-for-game'>
            <div className='child-container-for-game'>
                <span className='tic-tac-toe'>Tic-Tac-Toe</span>
                <div className='name-for-game'>
                    <span style={{marginRight:10}}>You: {"Nitesh"}</span>
                    <span>Opponent: {"Shivansh"}</span>
                </div>
                <div className='turn-for-game'>
                    <span>You are playing as {move}</span>
                    <span>{move}'s Turn</span>
                </div>
                <div className='child-game'>
                    <div className='row'>
                        <div onClick={e=>clicked(0)}>{board[0]}</div>
                        <div onClick={e=>clicked(1)}>{board[1]}</div>
                        <div onClick={e=>clicked(2)}>{board[2]}</div>
                    </div>
                    <div className='row'>
                        <div onClick={e=>clicked(3)}>{board[3]}</div>
                        <div onClick={e=>clicked(4)}>{board[4]}</div>
                        <div onClick={e=>clicked(5)}>{board[5]}</div>
                    </div>
                    <div className='row'>
                        <div onClick={e=>clicked(6)}>{board[6]}</div>
                        <div onClick={e=>clicked(7)}>{board[7]}</div>
                        <div onClick={e=>clicked(8)}>{board[8]}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game
