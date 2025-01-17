var power = document.querySelector("#power");
var stright = document.querySelector("#stright");
var start = document.querySelector("#start");
var topleft = document.querySelector("#topleft");
var topright = document.querySelector("#topright");
var bottomleft = document.querySelector("#bottomleft");
var bottomright = document.querySelector("#bottomright");
var count = document.querySelector("#countbox");

var onPower = false;
var onStright = false;

var order_list = [];
var user_list = [];

var turn;
var good;
var win;
var compTurn;
var intervalId;
var flash = 0;

power.addEventListener('change', function() {
    onPower = !onPower;
    console.log("onPower:", onPower);
    if (onPower === true) {
        start.disabled = false;
        stright.disabled = false;
        count.value = "-";
    } else {
        start.disabled = true;
        stright.disabled = true;
        count.value = '';
    }
});

stright.addEventListener('change', function() {
    onStright = !onStright;
    console.log("onStright:", onStright);
});

function play () {
    order_list = [];
    user_list = [];
    turn = 1;
    flash = 0;
    win = false;
    good = true;
    intervalId = 0;
    count.value = turn.toString();
    for (var i = 0; i < 20; i++) {
        order_list.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800);
}

start.addEventListener('click', function() {
    if (onPower || win) play();
    console.log(order_list);
})

function gameTurn () {
    onPower = false; // make player unable to click the buttons

    if (flash === turn) { // computer's turn over
        clearInterval(intervalId); // stop interveralId timer
        compTurn = false;
        clearColor();
        onPower = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order_list[flash] == 1) one();
            if (order_list[flash] == 2) two();
            if (order_list[flash] == 3) three();
            if (order_list[flash] == 4) four();
            flash++; // count the number of flashing time
        }, 300);
    }
}

function one() {
    topleft.style.backgroundColor = "#ccffcc";
}

function two() {
    topright.style.backgroundColor = "#ffcccc";
}

function three() {
    bottomleft.style.backgroundColor = "#ffffcc";
}

function four() {
    bottomright.style.backgroundColor = "#ccffff";
}

function clearColor () {
    topleft.style.backgroundColor = "green";
    topright.style.backgroundColor = "#e60000";
    bottomleft.style.backgroundColor = "orange";
    bottomright.style.backgroundColor = "blue";
}

function flashColor () {
    topleft.style.backgroundColor = "#ccffcc";
    topright.style.backgroundColor = "#ffcccc";
    bottomleft.style.backgroundColor = "#ffffcc";
    bottomright.style.backgroundColor = "#ccffff";
}

topleft.addEventListener("click", function () {
    if (onPower) {
        user_list.push(1);
        check();
        one();
        if (!win) setTimeout(clearColor, 300);
    }
})

topright.addEventListener("click", function () {
    if (onPower) {
        user_list.push(2);
        check();
        two();
        if (!win) setTimeout(clearColor, 300);
    }
})

bottomleft.addEventListener("click", function () {
    if (onPower) {
        user_list.push(3);
        check();
        three();
        if (!win) setTimeout(clearColor, 300);
    }
})

bottomright.addEventListener("click", function () {
    if (onPower) {
        user_list.push(4);
        check();
        four();
        if (!win) setTimeout(clearColor, 300);
    }
})

function check () {
    if (user_list[user_list.length - 1] !== order_list[user_list.length - 1]) good = false;

    if (user_list.length === 20 && good) {
        winGame();
    }

    if (good === false) {
        flashColor();
        count.value = "NO!";
        setTimeout(() => {
            count.innerHTML = turn.toString();
            clearColor();
            if (stright) {
                play();
            } else {
                compTurn = true;
                flash = 0; // renew the index to flash the light by computer
                user_list = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

    }

    if (turn == user_list.length && good && !win) {   // next round for the player
        turn++;
        flash = 0; // renew the index to flash the light by computer
        user_list = [];
        compTurn = true;
        count.value = turn.toString();
        intervalId = setInterval(gameTurn, 800);
    }

}

function winGame() {
    flashColor();
    count.value = "WIN!";
    win = true;
  }
