// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Updates the enemy's position
// dt: a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multipling any movement by the dt parameter which will
    // ensure the game runs at the same speed for all computers.
    this.x += this.speed * dt;
    if (this.x > 500 ){
        this.x = -50;
        this.speed = 80 + Math.floor(Math.random() * 100);
    }

};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.resetPosition = function(y){
    this.x = 0;
    this.y = y;
    this.speed = 80 + Math.floor(Math.random() * 100);
}
// check colliciosn should not use be prototype of enemy , it should be independent, it just shoudl 
Enemy.prototype.checkCollisions = function(){
    if (player.x < this.x + 70 && 
        player.x+70 > this.x && 
        player.y < this.y+ 60 &&
        player.y + 60 > this.y){
            player.resetPosition();
        }
   
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
 
const Player = function(x, y){
    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left' && this.x > 0)
        this.x -= 100;
    if (keyCode === 'right' && this.x < 400)
        this.x += 100;
    if (keyCode === 'up' && this.y > 0)
        this.y -= 85;
    if (keyCode === 'down' && this.y < 350)
        this.y += 85;  
        if (this.y < 0) {
            this.y = -20
            setTimeout(function(){ 
                showModal();
                this.x = 200;
                this.y = 390;
            }, 200);
        };       
};

Player.prototype.resetPosition = function(){
    this.x = 200;
    this.y = 390;
}

const player = new Player(200, 390);
const enemiesFirstYPositons = [64, 147, 230,];
const allEnemies = [new Enemy(0, enemiesFirstYPositons[0], 130),
                    new Enemy(0, enemiesFirstYPositons[1], 80),
                    new Enemy(0, enemiesFirstYPositons[2], 100)];

// This listens for key presses and sends the keys to 
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function showModal(){
    let modal = document.querySelector('.modal');
    modal.style.display = 'block';
    const newBTN = document.querySelector('.play');
    document.addEventListener('click', function() {
        modal.style.display = "none";
        player.resetPosition();
    })
}