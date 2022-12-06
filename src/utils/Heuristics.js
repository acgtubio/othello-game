import { getNextMoves } from "./BoardUtils";

// source: https://courses.cs.washington.edu/courses/cse573/04au/Project/mini1/RUSSIA/Final_Paper.pdf

export function CornerHeuristic(board){
    let blackScore = 0;
    let whiteScore = 0;
    let cornerHeuristic = 0;
    const corners = new Set([0,7,56,63]);

    for (const corner of corners){
        if(board[corner] == 0) {
            continue;
        }
        if (board[corner] == 2){
            blackScore += 1;
        }
        else {
            whiteScore += 1;
        }

    }

    // console.log(`white corners captured: ${whiteScore}`);
    // console.log(`black corners captured: ${blackScore}`);

    if (blackScore + whiteScore != 0){
        cornerHeuristic = 100 * (whiteScore-blackScore) / (whiteScore + blackScore);
    }

    // if(true){
    //     console.log(`corner heuristic: ${cornerHeuristic}`);
    // }

    return cornerHeuristic;
}

export function CoinParityHeuristic(board){
    let blackCoinCount = 0;
    let whiteCoinCount = 0;
    let coinParity = 0;

    for(let x = 0; x<board.length; x++){
        if(board[x] == 2) blackCoinCount++;
        else if(board[x] == 1) whiteCoinCount++;
    }

    // console.log(`black coins ${blackCoinCount}`);
    // console.log(`white coins: ${whiteCoinCount}`);

    coinParity = 100 * (whiteCoinCount - blackCoinCount) / (whiteCoinCount + blackCoinCount);

    // console.log(`coin parity: ${coinParity}`);

    return coinParity;
}

export function MobilityHeuristic(board){
    const whiteMoves = getNextMoves(false, board).size;
    const blackMoves = getNextMoves(true, board).size;
    let mobility = 0;

    if (whiteMoves + blackMoves != 0){
        mobility = 100 * (whiteMoves - blackMoves) / (whiteMoves + blackMoves);
    }

    // console.log(`mobility: ${mobility}`)
    return mobility;
}

export function StabilityHeuristic(board){
    const whiteMoves = getNextMoves(false, board);
    const blackMoves = getNextMoves(true, board);

    
}