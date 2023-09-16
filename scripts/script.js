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
    const play = (player, position) => {
        board[position - 1] = player.getSymbol()
        window.alert(player.playLog(position))
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
