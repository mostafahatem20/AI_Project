const { bestMove, checkWinner } = require('./minimax')
const readlineSync = require('readline-sync')
global.board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

global.ai = 'X'
global.human = 'O'
global.currentPlayer = ai
function printBoard() {
  console.log(' ')
  console.log(
    board[0][0] || ' ',
    ' | ',
    board[0][1] || ' ',
    ' | ',
    board[0][2] || ' '
  )
  console.log('---------------')
  console.log(
    board[1][0] || ' ',
    ' | ',
    board[1][1] || ' ',
    ' | ',
    board[1][2] || ' '
  )
  console.log('---------------')
  console.log(
    board[2][0] || ' ',
    ' | ',
    board[2][1] || ' ',
    ' | ',
    board[2][2] || ' '
  )
  console.log(' ')
}
function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i)
  }
  return indexes
}
function getEmpty() {
  return getAllIndexes(board.flat(), '')
}
function play(ans) {
  if (getEmpty().indexOf(parseInt(ans)) == -1) {
    return false
  }
  board[Math.floor(ans / 3)][ans % 3] = human
  return true
}
function startGame() {
  while (!checkWinner()) {
    if (currentPlayer === ai) {
      bestMove()
      console.log('AI just played')
    } else if (currentPlayer === human) {
      let played = false
      let answer = readlineSync.question(
        `Your turn choose a number from ${getEmpty()}: `
      )
      played = play(answer)
      while (!played) {
        let answer = readlineSync.question(
          `Wrong input please choose a number from ${getEmpty()}: `
        )
        played = play(answer)
      }
      currentPlayer = ai
    }
    printBoard()
  }
  let result = checkWinner()
  if (result == 'tie') {
    console.log('Tie!')
  } else {
    console.log(`${result} wins!`)
  }
  process.exit(1)
}
startGame()
