// 简单贪吃蛇小游戏

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

// 画布单位
var box = 32;

// 引入苹果和背景的图片，采用对象形式
var appleImage = new Image();
appleImage.src = "img\\food.png";

var groundImage = new Image();
groundImage.src = "img\\ground.png"

// 引入音频音效，对象形式
var deadAudio = new Audio();
var eatAudio = new Audio();
var upAudio = new Audio();
var downAudio = new Audio();
var leftAudio = new Audio();
var rightAudio = new Audio();
var bgm = new Audio();

deadAudio.src = "audio/dead.mp3"
eatAudio.src = "audio/eat.mp3"
upAudio.src = "audio/up.mp3"
downAudio.src = "audio/down.mp3"
leftAudio.src = "audio/left.mp3"
rightAudio.src = "audio/right.mp3"
bgm.src = "audio/bgm.mp3"

// 画蛇的一部分，一节
var snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
};




// 画苹果坐标
var apple = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// 分数
var score = 0;

// 控制蛇移动

var d;

document.addEventListener("keydown", direction);

function direction(event) {
    var key = event.keyCode;
    if (key == 37 && d != "right") {
        d = "left";
        leftAudio.play();
        bgm.play();
    } else if (key == 38 && d != "down") {
        d = "up";
        upAudio.play();
        bgm.play();
    } else if (key == 39 && d != "left") {
        d = "right";
        rightAudio.play();
        bgm.play();
    } else if (key == 40 && d != "up") {
        d = "down";
        downAudio.play();
        bgm.play();
    }
}

// 自杀
function suicide(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}
// 画入函数
function draw() {
    ctx.drawImage(groundImage, 0, 0);

    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(appleImage, apple.x, apple.y);

    // 原蛇头位置
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    // 开始提示
    ctx.fillStyle = "white";
    ctx.font = "20px Yahei";
    ctx.fillText("请按方向键开始游戏", 6 * box, 1.6 * box);

    // 分数
    ctx.fillStyle = "white";
    ctx.font = "45px Yahei";
    ctx.fillText(score, 2 * box, 1.6 * box);

    // 设置蛇的方向
    if (d == "left") {
        snakeX -= box;
    }
    if (d == "right") {
        snakeX += box;
    }
    if (d == "up") {
        snakeY -= box;
    }
    if (d == "down") {
        snakeY += box;
    }

    // 蛇吃了苹果
    if (snakeX == apple.x && snakeY == apple.y) {
        score++;
        eatAudio.play();
        apple = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }

    } else {
        snake.pop();
    }
    // 新的蛇头位置
    var newHead = {
        x: snakeX,
        y: snakeY
    }

    // 游戏结束条件
    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > 17 * box || suicide(newHead, snake)) {
        clearInterval(gameRun);
        deadAudio.play();
        window.setTimeout('alert("你挂了!!!")',600);
        window.setTimeout("location.reload()", 2000);
    }
    snake.unshift(newHead);
}

// 每100毫秒调用一次
var gameRun = setInterval(draw, 250);