

// X O grid stored in an array as global var.
var xoGrid = ["", "", "", "", "", "", "", "", ""]

const player = (playerName, playerMark, playerTurn) => {
    const name = playerName;
    const mark = playerMark;
    let turn = playerTurn;
    const play = (e, who) => {
        document.getElementById(`${e.target.id}`).innerHTML = mark;
        xoGrid[Number(e.target.id)] = mark;
        if (who === 1) {
            playerOne.turn = false;
            playerTwo.turn = true;
        } else {
            playerOne.turn = true;
            playerTwo.turn = false;
        }
    }
    return { name, mark, turn, play }
}


let playerOne, playerTwo;
document.querySelectorAll("input").forEach((inpt) => {
    inpt.addEventListener('change', e => {
        e.target.id === "playerOneInp" ? playerOne = player (e.target.value , "O", true): playerTwo = player (e.target.value, "X", false)
    })
})


// check for a winning situation
function winner(board) {
    // all possible combination of a winning game from line1 through line8
    const poss = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let isWin = [];
    var winIsThree = ['', '', '', '', '', '', '', ''];
    let winner;
    let j = 0;
    poss.forEach((el) => {
        // map will return an array of the all possible combination from poss
        // every will check if all the three elements are equivalent to either
        // 'X' or 'O', then change the value of the variable win to 'O' or 'X'
        let xo = "X";
        // we are using the loop a for-loop to alternate between "X" and "O" 
        // and test each el for both values
        for (var i = 0; i < 2; i++) {
            isWin.push(el.map((index) => board[index]).every((item) => {
                if (item === xo) {
                    winIsThree[j] += item;
                    return true
                } else {
                    return false
                }
            }))
            // change xo to O because we've already tested for "X"
            xo = "O"
        }
        j += 1
    })
    // if one element of winIsThree contains 3 of either X or O
    // return the appropiate mark (winner)
    winIsThree.forEach((item) => {
        if (item.length >= 3) {
            winner = item[0]
        }
    })
    // if at least one value in isWin is true return it
    // otherwise return "tie" if arr is full and false if the array
    // is still has empty cells
    if (isWin.some((item) => item === true)) {
        if (winner === "X") {
            swal( "\"" + playerTwo.name + "\"" + " Won The Game 🎉🎉🎉 \n" + "Please Refresh The Page To Start again!", {
                buttons: false,
                timer: 5000,
              })
        } else if (winner === "O") {
            swal( "\"" + playerOne.name + "\"" + " Won The Game 🎉🎉🎉 \n" + "Please Refresh The Page To Start again!", {
                buttons: false,
                timer: 5000,
              })
        }
    } else if (board.every((item) => item === "X" || item === "O")) {
        swal(" A Tie 🙂", {
            buttons: false,
            timer: 4000,
          })
    } else {
        return false;
    }
}


document.querySelectorAll("td").forEach(element => {
    element.addEventListener('click', (e) => {
        if (element.textContent === "") {
            if (playerOne.turn && winner(xoGrid) === false) {
                playerOne.play(e, 1)
                winner(xoGrid)
            } else if (playerTwo.turn && winner(xoGrid) === false) {
                playerTwo.play(e, 2)
                winner(xoGrid)
            }
            
        }
    })
});