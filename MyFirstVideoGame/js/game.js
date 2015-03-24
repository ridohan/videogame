/**
 * Created by red on 21/03/2015.
 */
var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;

var canvasElement = $("<canvas style='border: 1px solid black' width='" + CANVAS_WIDTH +
"' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');


var textX = 250;
var textY = 250;
var FPS = 30;

setInterval(function() {
    update();
    draw();
}, 1000/FPS);

var player = {
    color : "#00A",
    x : 270,
    y : 270,
    movementSpeed : 10,
    width : 32,
    height : 32,
    draw : function(){
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x,this.y,this.width,this.height);
    },
    inBounds : function(){
            return this.x >= this.movementSpeed && this.x <= CANVAS_WIDTH-this.movementSpeed &&
                this.y >= this.movementSpeed && this.y <= CANVAS_HEIGHT-this.movementSpeed;

    },
    canMoveLeft : function(){
        return this.x >= this.movementSpeed;
    },
    canMoveRight : function(){
        return this.x <= CANVAS_WIDTH-this.width;
    },
    canMoveTop : function(){
        return this.y >= this.movementSpeed;
    },
    canMoveDown : function(){
        return this.y <= CANVAS_HEIGHT-this.height;
    }

}


enemies = [];
function popEnemy(enemy){
    enemy = enemy || {};
    enemy.active = true;
    enemy.age = Math.floor(Math.random()/128);

    enemy.color = "#0AB";

    enemy.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH /2;
    enemy.y = 0;

    enemy.xVelocity = 0;
    enemy.yVelocity = 2;

    enemy.width = 32;
    enemy.height = 32;

    enemy.inBounds = function() {
        return enemy.x >= 0 && enemy.x <= CANVAS_WIDTH &&
            enemy.y >= 0 && enemy.y <= CANVAS_HEIGHT;
    };

    enemy.draw = function(){
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x,this.y,this.width,this.height);
    }

    enemy.update = function(){
        enemy.x += enemy.xVelocity;
        enemy.y += enemy.yVelocity;
        enemy.xVelocity = 3 * Math.sin(enemy.age * Math.PI / 64);

        enemy.age++;

        enemy.active = enemy.active && enemy.inBounds();
    }
    return enemy;
}


function update() {
    canvas.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    if (keydown.left && player.canMoveLeft()) {
        console.log(player.x);

        player.x -= player.movementSpeed;
    }
    if (keydown.up && player.canMoveTop()) {
        player.y -= player.movementSpeed;
    }
    if (keydown.down && player.canMoveDown()) {
        player.y += player.movementSpeed;
    }
    if (keydown.right && player.canMoveRight()) {
        console.log(player.x);
        player.x += player.movementSpeed;
    }
    player.draw();

    enemies.forEach(function(enemy) {
        enemy.update();
    });

    enemies = enemies.filter(function(enemy) {
        return enemy.active;
    });

    if(Math.random() < 0.1) {
        enemies.push(popEnemy());
    }
}

function draw() {
    canvas.fillStyle = "#000"; // Set color to black

    enemies.forEach(function(enemy) {
        enemy.draw();
    });
}