import { isGameOver, getNextMoves, move } from "./BoardUtils"
import { CornerHeuristic, CoinParityHeuristic, MobilityHeuristic } from "./Heuristics"

export function Minimax(board, depth, alpha, beta, maxPlayer){
    if (depth == 0 || isGameOver(board)){
        const corner = CornerHeuristic(board);
        const parity = CoinParityHeuristic(board);
        const mobility = MobilityHeuristic(board); 


        // console.log(`here: ${corner + parity + mobility}`)

        return corner + parity + mobility;
    }

    // console.log(`alpha: ${alpha} beta: ${beta}`)

    const moves = getNextMoves(!maxPlayer, board);
    const children = [];

    for(const mv of moves){
        const st = move(board, !maxPlayer, mv);
        children.push(st);
    }

    // console.log(children)

    let a2 = alpha;
    let b2 = beta;

    if(maxPlayer){
        let s = Number.NEGATIVE_INFINITY; 
        

        for (const child of children){
            const ev = Minimax(child, depth-1, a2, b2, !maxPlayer);
            s = ev > s ? ev : s;
            a2 = ev > alpha ? ev : alpha;
            // console.log(`alpha2: ${a2}`);

            if(beta <= a2){
                break;
            }
        }
        return s;
    }

    else {
        let s = Number.MAX_VALUE;

        for (const child of children){
            const ev = Minimax(child, depth-1, a2, b2, !maxPlayer);
            s = ev < s ? ev : s;
            b2 = ev < beta ? ev : beta;
            // console.log(`beta2: ${b2}`);
            if(b2 <= alpha){
                break;
            }
        }
        return s;
    }
}