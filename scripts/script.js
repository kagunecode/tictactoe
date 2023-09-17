const body = document.body
const elementContainer = document.querySelector('.center-box')
const startButton = document.querySelector('#start-button')

startButton.addEventListener('click', deleteElements)


const Player = (name, symbol) => {
    const getSymbol = () => symbol

    const playLog = position => {
        return `${name} has played in position ${position}`
    }

    const win = () => {
        return `${name} has won the game!`
    }

    return { playLog, win, getSymbol }
}

const Game = () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    let currentTurn = 1
    let position = 0
    const play = (player, e) => {
        position = e.target.getAttribute('data-id')
        board[position - 1] = player.getSymbol()
        window.alert(player.playLog(position))
        e.target.innerText = player.getSymbol()
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
    const game = Game()
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
        newDiv.setAttribute('data-id', i)
        console.log(i)
        gameContainer.appendChild(newDiv)
    }

    const boxes = document.querySelectorAll('.box')
    boxes.forEach(box => box.addEventListener('click', game.play.bind(this, player1)))
}