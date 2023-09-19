const GameBoard = () => {
    let board = [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()]

    const getBoard = () => board

    const playValue = (position, token) => {
        if (board[position].getValue() != 0) return false
        board[position].setValue(token)
        return true
    }

    const checkBoard = (token) => {
        if (board[0].getValue() == token && board[1].getValue() == token && board[2].getValue() == token) {
            return { 'status': 'win', 'position': [0, 1, 2] }
        } else if (board[3].getValue() == token && board[4].getValue() == token && board[5].getValue() == token) {
            return { 'status': 'win', 'position': [3, 4, 5] }
        } else if (board[6].getValue() == token && board[7].getValue() == token && board[8].getValue() == token) {
            return { 'status': 'win', 'position': [6, 7, 8] }
        } else if (board[0].getValue() == token && board[3].getValue() == token && board[6].getValue() == token) {
            return { 'status': 'win', 'position': [0, 3, 6] }
        } else if (board[1].getValue() == token && board[4].getValue() == token && board[7].getValue() == token) {
            return { 'status': 'win', 'position': [1, 4, 7] }
        } else if (board[2].getValue() == token && board[5].getValue() == token && board[8].getValue() == token) {
            return { 'status': 'win', 'position': [2, 5, 8] }
        } else if (board[0].getValue() == token && board[4].getValue() == token && board[8].getValue() == token) {
            return { 'status': 'win', 'position': [0, 4, 8] }
        } else if (board[2].getValue() == token && board[4].getValue() == token && board[6].getValue() == token) {
            return { 'status': 'win', 'position': [2, 4, 6] }
        } else if (board[0].getValue() != 0 && board[1].getValue() != 0 && board[2].getValue() != 0 && board[3].getValue() != 0
            && board[4].getValue() != 0 && board[5].getValue() != 0 && board[6].getValue() != 0 && board[7].getValue() != 0 && board[8].getValue() != 0) {
            return { 'status': 'draw' }
        }
        return { 'status': 'onProgress' }
    }

    return { getBoard, playValue, checkBoard }
}

const Cell = () => {
    let value = 0

    const getValue = () => value

    const setValue = token => {
        value = token
    }

    return { getValue, setValue }
}

const Game = (playerOne = 'Player One', playerTwo = 'Player Two') => {
    const board = GameBoard()
    let playGame = true


    const players = [
        {
            name: playerOne,
            token: 'X'
        },
        {
            name: playerTwo,
            token: 'O'
        }
    ]

    let currentPlayer = players[0]

    const switchPlayerTurn = () => currentPlayer = currentPlayer === players[0] ? players[1] : players[0]

    const newTurn = () => {
        screen.updateStatus(`It's ${currentPlayer.name}'s turn!`)
    }

    const playerWin = () => {
        if (board.checkBoard(currentPlayer.token).status === 'win') {
            screen.updateStatus(`${currentPlayer.name} won!`)
            screen.paintWinner(board.checkBoard(currentPlayer.token).position)
            return false
        } else if (board.checkBoard(currentPlayer.token).status === 'draw') {
            screen.updateStatus(`It's a draw!`)
            return false
        }
        return true
    }

    const playRound = position => {
        if (playGame) {
            if (board.playValue(position, currentPlayer.token)) {
                playGame = playerWin()
                screen.fillCell(position, currentPlayer.token)
                if (playGame) {
                    switchPlayerTurn()
                    newTurn()
                }
            } else {
                screen.updateStatus(`${currentPlayer.name}, the cell is taken!`)
            }
        } else {
            screen.updateStatus('The game has ended!')
        }
    }

    newTurn()

    return { playRound }
}

// UI HANDLE CODE

const screenController = () => {
    let game = ''
    const startButton = document.querySelector('#start-button')
    const boardDiv = document.querySelector('.center-box')
    const gameGrid = document.createElement('div')
    let alertDiv = document.createElement('h1')

    const deleteInitScreen = () => {
        const player1 = document.getElementById('playerOneName').value
        const player2 = document.getElementById('playerTwoName').value
        while (boardDiv.lastChild) {
            boardDiv.removeChild(boardDiv.lastChild)
        }
        game = Game(player1, player2)
        createBoard()
    }

    const fillCell = (position, token) => {
        let currentCell = document.getElementById(`${position}`)
        currentCell.innerText = token
    }

    const updateStatus = message => {
        alertDiv.innerText = message
    }

    const paintWinner = position => {
        const cells = document.querySelectorAll('.box')
        for (let i = 0; i < position.length; i++) {
            cells[position[i]].classList.add('winner-box')
        }
    }

    const createBoard = () => {
        gameGrid.classList.add('game-container')
        boardDiv.append(gameGrid)

        alertDiv.classList.add('game-alert')
        boardDiv.append(alertDiv)

        for (let i = 0; i < 9; i++) {
            const newCell = document.createElement('div')
            newCell.classList.add('box')
            newCell.classList.add('available')
            newCell.setAttribute('id', i)
            gameGrid.append(newCell)
        }

        const allCells = document.querySelectorAll('.box')
        allCells.forEach(cell => cell.addEventListener('click', e => {
            game.playRound(e.target.getAttribute('id'))
        }))
    }

    startButton.addEventListener('click', deleteInitScreen)

    return { deleteInitScreen, createBoard, fillCell, updateStatus, paintWinner }
}

const screen = screenController()