import { React, useState } from "react";
import Board from './Board.js'
import { getNextMoves, isGameOver, move } from "../utils/BoardUtils.js";
import { Minimax } from "../utils/Minimax.js";

export default function Game() {
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
    const [inProgress, setInProgress] = useState(true);
    const nextMoves = getNextMoves(p1Move, boardState);

    if(inProgress){
        
        if(isGameOver(boardState)){
            const whiteCount = boardState.filter(x => x== 1).length;
            const blackCount = boardState.filter(x => x== 2).length;

            if (whiteCount > blackCount){
                setWinner(1);
            }
            else if (blackCount > whiteCount){
                setWinner(2);
            }
            else console.log('tie');
            setInProgress(false);
            
        }
        
        if (nextMoves.size == 0){
            setP1Move(!p1Move);
        }

        if(!p1Move){
            setInProgress(false);

            let finalBoard = [];
            let bestMove = Number.NEGATIVE_INFINITY;

            for(const mv of nextMoves){
                const b = move(boardState, p1Move, mv);
                const v = Minimax(b, 6, Number.NEGATIVE_INFINITY, Number.MAX_VALUE, false);

                // console.log(v);
                
                if(v > bestMove){
                    finalBoard = b;
                    bestMove = v;
                }
            }

            console.log(`best move: ${bestMove}`);
            setTimeout(() => {
                setBoardState([...finalBoard]);
                setP1Move(!p1Move);
                setInProgress(true);
            }, 0);
            
        }
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
        setInProgress(true);
        setWinner(-1);
    }

    const win = <span className="winner">{winner == 1 ? 'AI Wins!': winner == 2 ? "You Win!" : ""}</span>

    return (
        <>
            <div className="game-container">
                <Board boardState = {boardState} setBoardState = {setBoardState} player={p1Move} setPlayer={setP1Move} nextMoves={nextMoves}/>
            </div>
            <div className="row">{win}</div>
            <div className="row">
                <div className="controls">
                    <div className="btn" onClick={reset}><span>Reset Game</span></div>
                </div>
            </div>
        </>
    )
}