const GameBoard = () => {
    let board = [Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell(), Cell()]

    const printBoard = () => {
        console.log(`${board[0].getValue()} ${board[1].getValue()} ${board[2].getValue()}\n${board[3].getValue()} ${board[4].getValue()} ${board[5].getValue()}\n${board[6].getValue()} ${board[7].getValue()} ${board[8].getValue()}`)
    }

    const playValue = (position, token) => {
        if (board[position].getValue() != 0) return false
        board[position].setValue(token)
        return true
    }

    const checkBoard = (token) => {
        if (board[0].getValue() == token && board[1].getValue() == token && board[2].getValue() == token) {
            return { 'status': 'win', 'position': 'row 1' }
        } else if (board[3].getValue() == token && board[4].getValue() == token && board[5].getValue() == token) {
            return { 'status': 'win', 'position': 'row 2' }
        } else if (board[6].getValue() == token && board[7].getValue() == token && board[8].getValue() == token) {
            return { 'status': 'win', 'position': 'row 3' }
        } else if (board[0].getValue() == token && board[3].getValue() == token && board[6].getValue() == token) {
            return { 'status': 'win', 'position': 'column 1' }
        } else if (board[1].getValue() == token && board[4].getValue() == token && board[7].getValue() == token) {
            return { 'status': 'win', 'position': 'column 2' }
        } else if (board[2].getValue() == token && board[5].getValue() == token && board[8].getValue() == token) {
            return { 'status': 'win', 'position': 'column 3' }
        } else if (board[0].getValue() == token && board[4].getValue() == token && board[8].getValue() == token) {
            return { 'status': 'win', 'position': 'top left corner' }
        } else if (board[2].getValue() == token && board[4].getValue() == token && board[6].getValue() == token) {
            return { 'status': 'win', 'position': 'top right corner' }
        } else if (board[0].getValue() != 0 && board[1].getValue() != 0 && board[2].getValue() != 0 && board[3].getValue() != 0
            && board[4].getValue() != 0 && board[5].getValue() != 0 && board[6].getValue() != 0 && board[7].getValue() != 0 && board[8].getValue() != 0) {
            return { 'status': 'draw' }
        }
        return { 'status': 'onProgress' }
    }

    return { printBoard, playValue, checkBoard }
}

const Cell = () => {
    let value = 0

    const setValue = token => {
        value = token
    }

    const getValue = () => value

    return { getValue, setValue }
}

const Game = (playerOne = 'Player One', playerTwo = 'Player Two', playerOneToken = 'X', playerTwoToken = 'O') => {
    let board = GameBoard()
    let playGame = true

    const players = [
        {
            name: playerOne,
            token: playerOneToken
        },
        {
            name: playerTwo,
            token: playerTwoToken
        }
    ]

    let currentPlayer = players[0]

    const switchTurn = () => currentPlayer = currentPlayer === players[0] ? players[1] : players[0]

    const newTurn = () => {
        console.log(`It's ${currentPlayer.name}'s turn!`)
        board.printBoard()
    }

    const playerWin = () => {
        if (board.checkBoard(currentPlayer.token).status == 'win') {
            console.log(`${currentPlayer.name} won on ${board.checkBoard(currentPlayer.token).position}`)
            board.printBoard()
            return false
        } else if (board.checkBoard(currentPlayer.token).status == 'draw') {
            console.log(`It's a draw!`)
            return false
        }
        return true
    }

    const playRound = position => {
        if (playGame) {
            if (board.playValue(position, currentPlayer.token)) {
                playGame = playerWin()
                if (playGame) {
                    switchTurn()
                    newTurn()
                }
            } else {
                console.log(`Sorry ${currentPlayer.name}, position ${position} has been already taken!`)
            }
        } else {
            console.log('The game has ended, use reset!')
        }
    }

    const resetGame = () => {
        board = GameBoard()
        playGame = true
        currentPlayer = players[0]
        console.log(`The game has been reset!`)
        newTurn()
    }

    newTurn()

    return { playRound, resetGame }
}

const game = Game('Kagune', 'Sphynx')

game.playRound(1)
game.playRound(6)
game.playRound(0)
game.playRound(5)
game.playRound(2)
game.playRound(3)
game.playRound(7)
game.resetGame()
game.playRound(1)