/*
    Init
 */

function init() {
    gameZone.innerHTML += `<div class="player" style="left: ${player.x}px; top: ${player.y}px;"></div><div class="bullets"></div>`;
    player.el = document.querySelector('.player');
    bullets.el = document.querySelector('.bullets');
}

/*
    Intervals
 */

function intervals() {
    ints.run = setInterval(() => {
        if(inbounds(player)) {
            for(var i = 0; i < bullets.length; i++) {
                var bullet = bullets[i];
                if(bullet.time>60*3) {
                    console.log(bullets.el.innerHTML);
                    bullets.el.innerHTML = bullets.el.innerHTML.slice(0, -bullet.el.outerHTML.length);
                    bullets.pop();
                }
                bullet.time++;
                bullet.x += bullet.speed * Math.sin(bullet.angle*Math.PI/180);
                bullet.y -= bullet.speed * Math.cos(bullet.angle*Math.PI/180);
                bullet.el.style.top = `${bullet.y}px`;
                bullet.el.style.left = `${bullet.x}px`;
            }
            if(player.shoot>0) player.shoot--;
            if (player.anim[1]) {
                player.x += player.step * Math.sin(player.angle*Math.PI/180);
                player.y -= player.step * Math.cos(player.angle*Math.PI/180);
                player.el.style.top = `${player.y}px`;
                player.el.style.left = `${player.x}px`;
            }
            if(player.anim[3]) {
                player.x -= player.step * Math.sin(player.angle*Math.PI/180);
                player.y += player.step * Math.cos(player.angle*Math.PI/180);
                player.el.style.top = `${player.y}px`;
                player.el.style.left = `${player.x}px`;
            }
            if(player.anim[2]) {
                player.angle += player.astep;
                player.el.style.transform = `rotate(${player.angle}deg)`;
            }
            if(player.anim[0]) {
                player.angle -= player.astep;
                player.el.style.transform = `rotate(${player.angle}deg)`;
            }
            if(player.anim[4]) {
                if(player.shoot==0) {
                    player.shoot = 100;
                    bullets[bullets.length] = {
                        el: false,
                        x: player.x+player.w/2,
                        y: player.y+player.h/2,
                        angle: player.angle,
                        time: 0,
                        speed: 10,
                    };
                    bullets.el.innerHTML += `<div class="bullet" style="left: ${bullets[bullets.length-1].x}px; top: ${bullets[bullets.length-1].y}px;"></div>`;
                    queryAll();
                }
            }
        }
    }, fps)
}

function inbounds({x, y}) {
    // return player.y > 0 &&
    // player.y < gameZone.getBoundingClientRect().bottom - player.h - 2 &&
    // player.x > 0 &&
    // player.x < gameZone.getBoundingClientRect().right - player.w - 2;
    return true;
}

function queryAll() {
player.el = document.querySelector('.player');
    for(var i = 0; i < bullets.length; i++) {
        bullets[i].el = document.querySelectorAll('.bullet')[i];
    }
}

/*
    Controllers
 */

function controllers() {
    document.addEventListener('keydown', (e) => {
        switch (e.keyCode) {
            case 38: // Top
                player.anim[3] = false;
                player.anim[1] = true;
                break;
            case 40: // Bottom
                player.anim[1] = false;
                player.anim[3] = true;
                break;
            case 39: // Right
                player.anim[0] = false;
                player.anim[2] = true;
                break;
            case 37: //Left
                player.anim[2] = false;
                player.anim[0] = true;
                break;
            case 32: // Shoot
                player.anim[4] = true;
                break;
        }
    });

    document.addEventListener('keyup', (e) => {
        if ([38, 40, 39, 37].includes(e.keyCode)) {
            player.anim[e.keyCode-37] = false;
            player.angle %= 360;
        }
        if(e.keyCode == 32) {
            player.anim[4] = false;
        }
    })
}

/*
    Start Game
 */

function game() {
    init();
    controllers();
    intervals();
}

let gameZone = document.querySelector('.game-zone'),
    fps = 1000 / 60,
    player = {
        sprite: 'src/sprites/player.png',
        el: false,
        x: 500,
        y: 400,
        angle: 0,
        step: 5,
        astep: 5,
        anim: [false,false,false,false,false],
        shoot: 0,
        w: 78,
        h: 77
    },
    bullets = []
    enemies = []
    ints = {
        run: false
    };

game();
