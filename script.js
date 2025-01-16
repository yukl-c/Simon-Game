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

power.addEventListener('change', function() {
    onPower = !onPower;
    console.log("onPower:", onPower);
    if (onPower === true) {
        start.disabled = false;
        stright.disabled = false;
        count.value = '-';
    } else {
        start.disabled = true;
        stright.disabled = true;
        count.value = '';
    }
    order_list = [];
    user_list = [];
});

stright.addEventListener('change', function() {
    onStright = !onStright;
    console.log("onStright:", onStright);
});

function orderGen () {
    order_list.push(Math.floor(Math.random() * 4));
}

start.addEventListener('click', function() {
    orderGen();
    console.log(order_list);
})

