import React, {useEffect } from 'react';
import '../cssFile/game.css';
import { startgame } from "../hooks/startgame";
import { useGameContext } from '../context/gameContext'
import { useNavigate } from 'react-router-dom';
import { usesocketIoContext } from '../context/socketIo';
import SearchUser from './searchUser';
const Game = () => {
    const { clicked, isDisabled, setIsDisabled, resetgame, fullName, changeMove} = startgame()
    const { game,setGame} = useGameContext()
    const navigate = useNavigate();
    const { socket } = usesocketIoContext();
    useEffect(() => {
        socket?.on("startplay", async ({ name,id}) => {
            setGame(prevState => ({ ...prevState,board:Array(9).fill(""), opponent: {name,id} ,show:false,notification:false}))
        }) 
        socket?.on("moveposition", async ({move}) => {
            clicked(move);
            if(!localStorage.getItem("ftm")){
                localStorage.setItem("ftm",game.move)
            }       
        })
        socket?.on("isDrawWin", async ({data})=>{
            if(data?.draw === "yes"){
                resetgame();
            }
            else if(data?.winner){
                const ftm = localStorage.getItem("ftm");
                if (data?.winner === ftm){
                    setGame({...game,winner:game.opponent.name})

                }
                else{
                    setGame({...game,winner:fullName})
                }
                resetgame();
            }
        })
        return () => {
            socket?.off("startplay");
            socket?.off("moveposition");
        }
    }, [socket])
    return (
        <>
            {game.show && <SearchUser />}
            <div className='container-for-game'>
                <div className='child-container-for-game'>
                    <span className='tic-tac-toe'>Tic-Tac-Toe</span>
                    {game.winner &&
                        <div className='after-winning-the-game'>
                            <span style={{ fontSize: 20 }}>{game.winner} opponent won the match</span>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <button onClick={e => navigate('/home')}>Go to Chat</button>
                                <button onClick={resetgame}>Start new game</button>
                            </div>
                        </div>}
                    {!game.winner && <>
                        <div className='name-for-game'>
                            <span style={{ marginRight: 10 }}>You: {fullName}</span>
                            {game.opponent.name&&<span>Opponent: {game.opponent.name}</span>}
                        </div>
                        <div className='turn-for-game'>
                            <span>You are playing as <select onClick={e => { isDisabled.one % 2 === 0 ? setIsDisabled({ ...isDisabled, two: true }) : setIsDisabled({ ...isDisabled, one: 2 }) }} disabled={isDisabled.two} onChange={e => { changeMove(e.target.value) }}>
                                <option value="X" >X</option>
                                <option value="O">O</option>
                            </select></span>
                            <span>{game.move}'s Turn</span>
                        </div>
                        <div className='child-game'>
                            <div className='row'>
                                <div onClick={e => clicked(0)}>{game.board[0]}</div>
                                <div onClick={e => clicked(1)}>{game.board[1]}</div>
                                <div onClick={e => clicked(2)}>{game.board[2]}</div>
                            </div>
                            <div className='row'>
                                <div onClick={e => clicked(3)}>{game.board[3]}</div>
                                <div onClick={e => clicked(4)}>{game.board[4]}</div>
                                <div onClick={e => clicked(5)}>{game.board[5]}</div>
                            </div>
                            <div className='row'>
                                <div onClick={e => clicked(6)}>{game.board[6]}</div>
                                <div onClick={e => clicked(7)}>{game.board[7]}</div>
                                <div onClick={e => clicked(8)}>{game.board[8]}</div>
                            </div>
                        </div>
                    </>}
                </div>

            </div>
        </>
    )
}

export default Game
