# Kakuro Puzzle Solver

[Kakuro](https://www.kakuros.com/) puzzles are like number crosswords.

![puz](https://i.gyazo.com/3268e9efbc13660b9bcc6e9b696d856d.png)

## Challenge

Accept matrix of tiles being grey, white, or clues. Return finished matrix with all white tiles replaced by their solution number.

![solved](https://i.gyazo.com/830891f9267b7ebba071166f242a798a.png)

Boards can take on strange shapes as they grow. The goal is to solve 30x30 puzzles in a few ms.

![big](https://i.gyazo.com/23cf93826c40c0883a9dc6738e467b8c.png)

## Notes

The plan is to, for each clue, generate a set of sets of integers that sum to the clue. By comparing clue sets that share an affected tile, we can make deterministic eliminations of possibilities similar to sudoku. Eventually, each clue intersection will have only one possible number that makes sense in that tile.
