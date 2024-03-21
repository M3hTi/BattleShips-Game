
// We use MVC 

// View objecct
let view = {
    displayMessage : function(message) {
        let messageElement = document.querySelector(".js-message");
        messageElement.innerHTML = message;
    },
    displayHit : function(location) {
        let hitArea = document.getElementById(location);
        hitArea.classList.add('hit');
    },
    displayMiss : function(location) {
        let missArea = document.getElementById(location);
        missArea.classList.add('miss');
    }
}
// ------------------------------------------------
// Examine my view object
// view.displayMessage("Ready, Aim, Fire!");
// view.displayHit("36");
// view.displayMiss("42");
// --------------------------------------------------

// Model object
let model = {
    boardSize: 7,
    numShips : 3,
    shipLegnth : 3,
    shipSunk : 0,
    ships : [{location : ["06","16","26"], hits : ["","",""]},
            {location : ["14","24","34"], hits : ["","",""]},
            {location : ["41","42","43"], hits : ["","",""]}],
    fire : function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            const ship = this.ships[i];
            let index = ship.location.indexOf(guess);
            if(index >= 0){
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT")
                if(this.isSunk(ship)) {
                    this.shipSunk += 1;
                    view.displayMessage("You sunk my Battleship!");
                }
                return true
            }
        }
            view.displayMiss(guess);
            view.displayMessage("You missed!");
            return false
    },
    isSunk : function (ship) {
        for (let i = 0; i < this.shipLegnth; i++) {
            if(ship.hits[i] !== "hit") {
                return false
            }
        }
        return true
    }
}



// --------------------------------------------------
// Examine my model object
// model.fire("41"); // returns true
// model.fire("42");
// model.fire("43");
// ---------------------------------------------------


let parseGuess = function(guess) {
    let alphabet = ["A","B","C","D","E","F","G"];
    if(guess === null || guess.length !== 2) {
        alert("pls enter a valid guess");
    }else{
        guess = guess.toUpperCase();
        let firstChar = guess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = guess.charAt(1);
        if(isNaN(row) || isNaN(column)) {
            alert("oops, that's not on the board");
        }else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("oops, that's off the board");
        } else {
            return row + column
        }
    }
    return null
}

// object controller
let controller = {
    guesses : 0,
    processGuess : function(guess) {
        let location = parseGuess(guess);
        if(location) {
            this.guesses++;
            let hit = model.fire(location);
            if(hit && model.shipSunk === model.numShips) {
                view.displayMessage(`You sank all my battleships, in + ${this.guesses} guesses`);
            }
        }
    }

}

// Examine my controller object
// controller.processGuess("A1");
// controller.processGuess("A6");







let init = function() {
    let buttonFireElement = document.querySelector(".js-fire");
    console.log(buttonFireElement);
    buttonFireElement.onclick = handlerFireButton;
    
}


let handlerFireButton = function() {
    let inputElement = document.querySelector(".js-guess");
    let guess = inputElement.value;
    // call the method on the controller passing
    controller.processGuess(guess);
    inputElement.value = "";
}


window.onload = init;