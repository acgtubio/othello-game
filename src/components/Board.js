import React from "react";
import Tile from "./Tile";

export default function Board({ boardState, setBoardState, player, setPlayer, nextMoves, lastMove, setLastMove }){
    const tiles = boardState.map((tile, index) => {
        return <Tile 
            boardState = {boardState} 
            setBoardState = {setBoardState} 
            player = {player} 
            setPlayer = {setPlayer} 
            nextMoves = {nextMoves} 
            i = {index}
            lastMove = { lastMove }
            setLastMove = { setLastMove }
        />
    })

    return (
        <div className="grid-container">
            {tiles}
        </div>
    )
}