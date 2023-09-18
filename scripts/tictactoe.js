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

    const checkBoard = () => {
        if (board[0] == player.getSymbol() && board[1] == player.getSymbol() && board[2] == player.getSymbol()) {
            return 'row 1'
        } else if (board[3] == player.getSymbol() && board[4] == player.getSymbol() && board[5] == player.getSymbol()) {
            return 'row 2'
        } else if (board[6] == player.getSymbol() && board[7] == player.getSymbol() && board[8] == player.getSymbol()) {
            return 'row 3'
        } else if (board[0] == player.getSymbol() && board[3] == player.getSymbol() && board[6] == player.getSymbol()) {
            return 'column 1'
        } else if (board[1] == player.getSymbol() && board[4] == player.getSymbol() && board[7] == player.getSymbol()) {
            return 'column 2'
        } else if (board[2] == player.getSymbol() && board[5] == player.getSymbol() && board[8] == player.getSymbol()) {
            return 'column 3'
        } else if (board[0] == player.getSymbol() && board[4] == player.getSymbol() && board[8] == player.getSymbol()) {
            return 'top left corner'
        } else if (board[3] == player.getSymbol() && board[4] == player.getSymbol() && board[6] == player.getSymbol()) {
            return 'top right corner'
        } else if (!board.includes(0)) {
            return 'draw'
        }
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
    const board = GameBoard()

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
        board.printBoard()
        console.log(`It's ${currentPlayer.name}'s turn!`)
    }

    const playRound = position => {
        if (board.playValue(position, currentPlayer.token)) {
            switchTurn()
            newTurn()
        } else {
            console.log(`Sorry ${currentPlayer.name}, position ${position} has been already taken!`)
        }
    }

    newTurn()

    return { playRound }
}