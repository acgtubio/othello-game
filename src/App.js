import { React } from "react";
import Game from './components/Game.js'
import { CornerHeuristic, CoinParityHeuristic, MobilityHeuristic } from "./utils/Heuristics.js";

export default function App(){

//   CornerHeuristic([
//     1, 0, 0, 0, 0, 0, 0, 1,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 1, 2, 0, 0, 0,
//     0, 0, 1, 2, 1, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 2,
// ], false)

//   CoinParityHeuristic([
//     1, 0, 0, 0, 0, 0, 0, 1,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 1, 2, 0, 0, 0,
//     0, 0, 1, 2, 1, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 0, 2,
// ], false)

// MobilityHeuristic([
//   1, 0, 0, 0, 0, 0, 0, 1,
//   0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 1, 2, 0, 0, 0,
//   0, 0, 1, 2, 1, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 2,
// ], false)

  return (
    <>
      <Game />
    </>
  )
}
