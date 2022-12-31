import { React, useState } from "react";
import Board from './Board.js'
import { getNextMoves, isGameOver, move } from "../utils/BoardUtils.js";
import { Minimax } from "../utils/Minimax.js";

export default function Game() {
    // const [boardState, setBoardState] = useState([
    //     1, 2, 0, 0, 0, 0, 1, 0,
    //     1, 2, 0, 0, 0, 0, 1, 0,
    //     1, 2, 0, 0, 0, 1, 1, 0,
    //     1, 2, 0, 1, 2, 1, 1, 0,
    //     1, 2, 0, 2, 1, 1, 0, 0,
    //     0, 0, 0, 2, 2, 0, 0, 0,
    //     0, 0, 0, 0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0, 0, 0, 0,
    // ]);
    const [boardState, setBoardState] = useState([
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 2, 0, 0, 0,
        0, 0, 0, 2, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const [p1Move, setP1Move] = useState(true);
    const [winner, setWinner] = useState(-1);
    let [inProgress, setInProgress] = useState(1);
    const [lastMove, setLastMove] = useState(-1);
    const [gameMessage, setGameMessage] = useState("");
    const nextMoves = getNextMoves(p1Move, boardState);

    if(inProgress != 0 && inProgress != -1 && isGameOver(boardState)){
        console.log('here');
        inProgress = 0;
        setInProgress(0);
        setLastMove(-1);
    }

    if(inProgress == 1){
        
        if(nextMoves.size == 0 ){
            console.log('no moves')
            setInProgress(2);
            setGameMessage("No more moves available. Switching to different player in a few moments.")

            setTimeout(() => {
                setP1Move(!p1Move);  
                setInProgress(1);
                setGameMessage("");
            }, 2000);
            
        }

        if(!p1Move){
            setInProgress(2);

            setTimeout(() => {
                let finalBoard = [];
                let moveIndex = -1;
                let bestMove = Number.NEGATIVE_INFINITY;

                for(const mv of nextMoves){
                    const b = move(boardState, p1Move, mv);
                    const v = Minimax(b, 3, Number.NEGATIVE_INFINITY, Number.MAX_VALUE, false);

                    // console.log(v);
                    
                    if(v > bestMove){
                        finalBoard = b;
                        moveIndex = mv;
                        bestMove = v;
                    }
                }

                // console.log(`best move: ${bestMove}`);
                setLastMove(moveIndex);
                setP1Move(!p1Move);
                setBoardState([...finalBoard]);
                setInProgress(1);
            }, 1000);
            
        }
    }
    else if(inProgress==0){
        const whiteCount = boardState.filter(x => x== 1).length;
        const blackCount = boardState.filter(x => x== 2).length;

        if (whiteCount > blackCount){
            setWinner(1);
        }
        else if (blackCount > whiteCount){
            setWinner(2);
        }
        else{
            setWinner(3);
        }
        setInProgress(-1);
    }
    
    function reset(){
        setBoardState([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 2, 0, 0, 0,
            0, 0, 0, 2, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
        ])
        setP1Move(true);
        setInProgress(1);
        setWinner(-1);
    }

    const win = <span className="winner">{winner == 1 ? 'AI Wins!': winner == 2 ? "You Win!" : winner == 3 ? "TIE" : ""}</span>

    return (
        <>
            <div className="game-container">
                <Board 
                    boardState = {boardState} 
                    setBoardState = {setBoardState} 
                    player={p1Move} 
                    setPlayer={setP1Move} 
                    nextMoves={nextMoves}
                    lastMove={lastMove}
                    setLastMove={setLastMove}
                />
            </div>
            <div className="row">{gameMessage}</div>
            <div className="row">{win}</div>
            <div className="row">
                <div className="controls">
                    <div className="btn" onClick={reset}><span>Reset Game</span></div>
                </div>
            </div>
        </>
    )
}