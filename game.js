/*
    Init
 */

function init() {
    gameZone.innerHTML += `<div class="player" style="left: ${player.x}px; top: ${player.y}px;"></div>`;
    player.el = document.querySelector('.player');
}

/*
    Intervals
 */

function intervals() {
    ints.run = setInterval(() => {
        if(inbounds(player)) {
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
        }
    });

    document.addEventListener('keyup', (e) => {
        if ([38, 40, 39, 37].includes(e.keyCode)) {
            player.anim[e.keyCode-37] = false;
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
        anim: [false,false,false,false],
        w: 78,
        h: 77
    },
    ints = {
        run: false
    };

game();
