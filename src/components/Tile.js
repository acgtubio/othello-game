import React from "react";
import { motion } from 'framer-motion';
import { move, RightSandwich, LeftSandwich, TopSandwich, BottomSandwich, TopRightSandwich, BottomRightSandwich, BottomLeftSandwich, TopLeftSandwich } from "../utils/BoardUtils";

export default function Tile({ boardState, setBoardState, player, setPlayer, nextMoves, i }){
    const up = new Set([0, 1, 2, 3, 4, 5, 6, 7]);
    const down = new Set([56, 57, 58, 59, 60, 61, 62, 63]);
    const right = new Set([7, 15, 23, 31, 39, 47, 55, 63]);
    const left = new Set([0, 8, 16, 24, 32, 40, 48, 56]);

    function click() {
        if(nextMoves.has(i) && player){
            
            const nBoard = move(boardState, player, i);

            setBoardState([...nBoard]);
            setPlayer(!player);
        }
    }

    const pTurn = player ? 'avMoveB' : 'avMoveW';

    const tileColor = `circle ${ nextMoves.has(i) ? `${pTurn} ` : boardState[i] == 1 ? 'white' : boardState[i] == 2 ? 'black' : ''}`;
    return (
        
        <div className="board-tile" onClick={() => { click() }}>
            <div className={tileColor}>
            </div>
        </div>
    )
}