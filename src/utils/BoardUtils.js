const up = new Set([0, 1, 2, 3, 4, 5, 6, 7]);
const down = new Set([56, 57, 58, 59, 60, 61, 62, 63]);
const right = new Set([7, 15, 23, 31, 39, 47, 55, 63]);
const left = new Set([0, 8, 16, 24, 32, 40, 48, 56]);

export function move(board, player, i){
    
    // // console.log('buh')
    const nBoard = [...board];
    
    const s = player ? 1 : 2;
    const t = player ? 2 : 1;

    nBoard[i] = t;

    // // console.log('check right')
    if(nBoard[i+1] == s && !right.has(i)){
        const toRight = RightSandwich(board, i + 1, t)

        if(toRight){
            // // console.log('right')
            var patty = i + 1;
            while(board[patty] != t){
                nBoard[patty] = t;
                patty += 1;
            }
        }
    }

    // // console.log('check lefts')
    if(nBoard[i-1] == s && !left.has(i)){
        const toLeft = LeftSandwich(board, i - 1, t)
        // // console.log(`left ${toLeft}`)

        if(toLeft){
            // console.log('left')
            var patty = i - 1;
            while(board[patty] != t){
                nBoard[patty] = t;
                patty -= 1;
            }
        }
    }

    // // console.log('check top')
    if(nBoard[i-8] == s && !up.has(i)){
        const top = TopSandwich(board, i - 8, t)
        // // console.log(`top ${top}`)
        if(top){
            // console.log('top')
            var patty = i - 8;
            while(board[patty] != t){
                // console.log(`top ${patty}`)
                nBoard[patty] = t;
                patty -= 8;
            }
        }
    }

    // // console.log('check bot')
    if(nBoard[i+8] == s && !down.has(i)){
        const bot = BottomSandwich(board, i + 8, t)
        // // console.log(`bot ${bot}`)

        if(bot){
            // // console.log('bottom')
            var patty = i + 8;
            while(board[patty] != t){
                // // console.log(`bottom ${patty}`)
                nBoard[patty] = t;
                patty += 8;
            }
        }
    }

    // console.log('check tr')
    if(nBoard[i-7] == s && !up.has(i) && !right.has(i)){
        const tr = TopRightSandwich(board, i - 7, t)

        if(tr){
            // console.log('top right')
            var patty = i - 7;
            while(board[patty] != t){
                nBoard[patty] = t;
                patty -= 7;
            }
        }
    }

    // console.log('check tl')
    if(nBoard[i-9] == s && !up.has(i) && !left.has(i)){
        const tl = TopLeftSandwich(board, i - 9, t)

        if(tl){
            // console.log('top left')
            var patty = i - 9;
            while(board[patty] != t){
                nBoard[patty] = t;
                patty -= 9;
            }
        }
    }

    // console.log('check bl')
    if(nBoard[i+7] == s && !down.has(i) && !left.has(i)){
        const tr = BottomLeftSandwich(board, i + 7, t)

        if(tr){
            // console.log('bottom left')
            var patty = i + 7;
            while(board[patty] != t){
                nBoard[patty] = t;
                patty += 7;
            }
        }
    }
    
    // console.log('check br')
    if(nBoard[i+9] == s && !down.has(nBoard[i]) && !right.has(nBoard[i])){
        const tl = BottomRightSandwich(board, i + 9, t)

        if(tl){
            // console.log('bottm right')
            var patty = i + 9;
            while(board[patty] != t){
                nBoard[patty] = t;
                patty += 9;
            }
        }
    }

    return [...nBoard];
    
}

export function isGameOver(board){
    const whiteMoves = getNextMoves(false, board).size;
    const blackMoves = getNextMoves(true, board).size;

    if (whiteMoves + blackMoves == 0) return true;

    return false;
}

export function getNextMoves(player, boardState){
    // determine whose turn and find the opposite color
    const n = player ? 1 : 2;
    const t = player ? 2 : 1;
    const target = findIndices(boardState, n);
    const avMoves = [];

    // // console.log(`board state: ${boardState}`)

    for(const tile of target){

        // // console.log(`checking ${tile}`)

        // For 1000 or 0111 forms
        // // console.log('check right')
        if(!left.has(tile) && !right.has(tile) && boardState[tile+1]==0 ){
            // // console.log('not in rightmost.');
            var i = 1;
            while(true){
                if(boardState[tile-i] == t){
                    avMoves.push(tile+1);
                    break;
                }
                if(boardState[tile-i] == 0 || left.has(tile-i)){
                    break;
                }
                i+=1;
            }
        }

        // For 0001 and 11110 forms.
        // // console.log('check left')
        if(!left.has(tile) && !right.has(tile) && boardState[tile-1]==0 ){
            // // console.log('not in leftmost.');
            var i = 1;
            while(true){
                if(boardState[tile+i] == t){
                    avMoves.push(tile-1);
                    break;
                }
                if(boardState[tile+i] == 0 || right.has(tile+i)){
                    break;
                }
                i+=1;
            }
        }

        // // console.log('check bottom')
        if(!up.has(tile) && !down.has(tile) && boardState[tile+8]==0 ){
            // // console.log('not in bottom.');
            var i = 8;
            while(true){
                if(boardState[tile-i] == t){
                    avMoves.push(tile+8);
                    break;
                }
                if(boardState[tile-i] == 0 || up.has(tile-i)){
                    break;
                }
                i+=8;
            }
        }

        // // console.log('check top')
        if(!up.has(tile) && !down.has(tile) && boardState[tile-8]==0 ){
            // // console.log('not in top.');
            var i = 8;
            while(true){
                if(boardState[tile+i] == t){
                    avMoves.push(tile-8);
                    break;
                }
                if(boardState[tile+i] == 0 || down.has(tile+i)){
                    break;
                }
                i+=8;
            }
        }
        
        // // console.log('check diagonal')
        if(!left.has(tile) && !down.has(tile) && !up.has(tile) && !right.has(tile)){
            // // console.log('not in edges.');

            // // console.log('check br')
            if(boardState[tile+9] == 0){
                var i = 9;
                while(true){
                    if(boardState[tile-i] == t){
                        avMoves.push(tile+9);
                        break;
                    }
                    if(boardState[tile-i] == 0 || (up.has(tile-i) || left.has(tile-i))){
                        break;
                    }
                    i+=9;
                }
            }

            // // console.log('check bl')
            if(boardState[tile+7] == 0){
                var i = 7;
                while(true){
                    if(boardState[tile-i] == t){
                        avMoves.push(tile+7);
                        break;
                    }
                    if(boardState[tile-i] == 0 || (up.has(tile-i) || right.has(tile-i))){
                        break;
                    }
                    i+=7;
                }
            }

            // // console.log('check tl')
            if(boardState[tile-9] == 0){
                var i = 9;
                while(true){
                    if(boardState[tile+i] == t){
                        avMoves.push(tile-9);
                        break;
                    }
                    if(boardState[tile+i] == 0 || (down.has(tile+i) || right.has(tile+i))){
                        break;
                    }
                    i+=9;
                }
            }

            // // console.log('check tr')
            if(boardState[tile-7] == 0){
                var i = 7;
                while(true){
                    if(boardState[tile+i] == t){
                        avMoves.push(tile-7);
                        break;
                    }
                    if(boardState[tile+i] == 0 || (down.has(tile+i) || left.has(tile+i))){
                        break;
                    }
                    i+=7;
                }
            }
        }
    }

    // // console.log(avMoves)

    return new Set([...avMoves]);
}

export function Sandwich(){
    // add general sandwich function
}

export function RightSandwich(board, startIndex, target){
    var i = startIndex;

    while(true) {
        if(board[i] == target){
            return true;
        }
        
        if(board[i] == 0  || right.has(i) || i < 0 || i > board.length){
            return false;
        }

        i+=1;
    }
}

export function LeftSandwich(board, startIndex, target){
    var i = startIndex;

    while(true) {
        if(board[i] == target){
            return true;
        }
        
        if(board[i] == 0  || left.has(i) || i < 0 || i > board.length){
            return false;
        }

        i= i -1;
    }
}

export function TopSandwich(board, startIndex, target){
    var i = startIndex;

    while(true) {
        if(board[i] == target){
            return true;
        }
        
        if(board[i] == 0  || up.has(i) || i < 0 || i > board.length){
            return false;
        }

        i= i - 8;
    }
}

export function BottomSandwich(board, startIndex, target){
    var i = startIndex;

    while(true) {
        if(board[i] == target){
            return true;
        }
        
        if(board[i] == 0  || down.has(i) || i < 0 || i > board.length){
            return false;
        }

        i+=8;
    }
}

export function TopRightSandwich(board, startIndex, target){
    var i = startIndex;

    while(true) {
        if(board[i] == target){
            return true;
        }
        
        if(board[i] == 0  || (up.has(i)  || right.has(i)) || i < 0 || i > board.length){
            return false;
        }

        i-=7;
    }
}

export function TopLeftSandwich(board, startIndex, target){
    var i = startIndex;

    while(true) {
        if(board[i] == target){
            return true;
        }
        
        if(board[i] == 0  || (up.has(i)  || left.has(i)) || i < 0 || i > board.length){
            return false;
        }

        i-=9;
    }
}

export function BottomLeftSandwich(board, startIndex, target){
    var i = startIndex;

    while(true) {
        if(board[i] == target){
            return true;
        }
        
        if(board[i] == 0  || (down.has(i)  || left.has(i)) || i < 0 || i > board.length){
            return false;
        }

        i+=7;
    }
}

export function BottomRightSandwich(board, startIndex, target){
    var i = startIndex;

    while(true) {
        if(board[i] == target){
            return true;
        }
        
        if(board[i] == 0  || (down.has(i)  || right.has(i)) || i < 0 || i > board.length){
            return false;
        }

        i+=9;
    }
}

function findIndices(arr, val){
    const indices = [];
    var i = -1;

    while((i=arr.indexOf(val, i+1)) != -1){
        indices.push(i);
    }
    return [...indices]
}