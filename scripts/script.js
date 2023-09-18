const body = document.body
const elementContainer = document.querySelector('.center-box')
const startButton = document.querySelector('#start-button')
let turn = 1

startButton.addEventListener('click', deleteElements)


const Player = (name, symbol) => {
    const getSymbol = () => symbol

    const playTurn = () => {
        return `It's ${name}'s turn!`
    }

    const win = () => {
        return `${name} has won the game!`
    }

    return { playTurn, win, getSymbol }
}

const Game = (player1, player2) => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    let position = 0
    const play = (player, e) => {
        position = e.target.getAttribute('data-id')
        board[position] = player.getSymbol()
        e.target.innerText = player.getSymbol()
    }

    const turn = turn => {
        if (turn % 2 != 0) {
            return player2.playTurn()
        } else {
            return player1.playTurn()
        }
    }

    const checkBoard = (player) => {
        if (board[0] == player.getSymbol() && board[1] == player.getSymbol() && board[2] == player.getSymbol()) {
            window.alert(player.win())
        } else if (board[3] == player.getSymbol() && board[4] == player.getSymbol() && board[5] == player.getSymbol()) {
            window.alert(player.win())
        } else if (board[6] == player.getSymbol() && board[7] == player.getSymbol() && board[8] == player.getSymbol()) {
            window.alert(player.win())
        } else if (board[0] == player.getSymbol() && board[3] == player.getSymbol() && board[6] == player.getSymbol()) {
            window.alert(player.win())
        } else if (board[1] == player.getSymbol() && board[4] == player.getSymbol() && board[7] == player.getSymbol()) {
            window.alert(player.win())
        } else if (board[2] == player.getSymbol() && board[5] == player.getSymbol() && board[8] == player.getSymbol()) {
            window.alert(player.win())
        } else if (board[0] == player.getSymbol() && board[4] == player.getSymbol() && board[8] == player.getSymbol()) {
            window.alert(player.win())
        } else if (board[3] == player.getSymbol() && board[4] == player.getSymbol() && board[6] == player.getSymbol()) {
            window.alert(player.win())
        }
    }

    return { play, checkBoard }
}

function deleteElements() {
    const player1 = Player(document.getElementById('playerOneName').value, 'X')
    const player2 = Player(document.getElementById('playerTwoName').value, 'O')
    const game = Game(player1, player2)

    while (elementContainer.lastChild) {
        elementContainer.removeChild(elementContainer.lastChild)
    }

    let gameContainer = document.createElement('div')
    gameContainer.classList.add('game-container')
    elementContainer.appendChild(gameContainer)

    let gameAlert = document.createElement('h1')
    gameAlert.classList.add('game-alert')
    gameAlert.innerText = `Let's start!`
    elementContainer.append(gameAlert)

    for (let i = 0; i < 9; i++) {
        let newDiv = document.createElement('div')
        newDiv.classList.add('box')
        newDiv.classList.add('full')
        newDiv.setAttribute('data-id', i)
        console.log(i)
        gameContainer.appendChild(newDiv)
    }

    const boxes = document.querySelectorAll('.full')
    boxes.forEach(box => box.addEventListener('click', e => {
        if (turn % 2 != 0) {
            gameAlert.innerText = player2.playTurn()
            game.play(player1, e)
            e.target.classList.remove('full')
            turn += 1
            game.checkBoard(player1)
        } else {
            gameAlert.innerText = player1.playTurn()
            game.play(player2, e)
            e.target.classList.remove('full')
            turn += 1
            game.checkBoard(player2)
        }
    }))
}