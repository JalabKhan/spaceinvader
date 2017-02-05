////  Author: Jalab Khan  ////
// Setup Canvas, Variable, Booleans, Arrays //
var canvas = document.querySelector("#make"),
    ctx = canvas.getContext("2d"),
    change,
    space1 = false,
    left1 = false,
    right1 = false,
    up1 = false,
    down1 = false,
    pressedKeys = [],
    li,
    score = 0;
// Get Random //
function rand(min, max) {
    "use strict";
    return Math.floor((Math.random() * max) + min);
}
// Create Invader //
function Invader(x, y) {
    'use strict';
    // Set X and Y Position //
    this.x = x;
    this.y = y;
    this.clash = false;
    // Show Invader //
    this.showpi = function () {
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, 40, 40);
    };
    // Move Invader //
    this.movepi = function () {
        this.y = y + 30;
        y = y + 30;
    };
}
// Create Ship //
function Ship(x, y) {
    'use strict';
    // Set X and Y Position //
    this.x = x;
    this.y = y;
    var movmentspeed = 0.8;
    // Show Ship //
    this.showpi = function () {
        // Shade Of Red //
        ctx.fillStyle = '#f44242';
        ctx.fillRect(x - 30, y, 80, 20);
        // Shade Of Blue //
        ctx.fillStyle = '#5563fc';
        ctx.fillRect(x, y - 30, 20, 50);
    };
    // Move Left //
    this.moveleft = function () {
        this.x = x + movmentspeed;
        x = x + movmentspeed;
        if (x < 30) {
            x = 30;
        } else if (x > (canvas.width - 40)) {
            x = canvas.width - 40;
        }
    };
    // Move Right //
    this.moveright = function () {
        this.x = x - movmentspeed;
        x = x - movmentspeed;
        if (x < 30) {
            x = 30;
        } else if (x > (canvas.width - 40)) {
            x = canvas.width - 40;
        }
    };
    // Move Up //
    this.moveup = function () {
        this.y = y - movmentspeed;
        y = y - movmentspeed;
        if (y < 30) {
            y = 30;
        } else if (y > (canvas.height - 40)) {
            y = canvas.height - 40;
        }
    };
    // Move Down //
    this.movedown = function () {
        this.y = y + movmentspeed;
        y = y + movmentspeed;
        if (y < 30) {
            y = 30;
        } else if (y > (canvas.height - 40)) {
            y = canvas.height - 40;
        }
    };
}
// Variables and Arrays for Objects //
var bullets = [],
    invaders = [],
    ship = new Ship(800 / 2, 700 - 30);
// Create Bullet //
function Bullet(x, y) {
    'use strict';
    // Set X and Y Position //
    this.x = x;
    this.y = y;
    // Set Speed & Get Random Color //
    var speed = 4.5,
        bulletcolor = ['red', 'yellow', 'blue', 'green', 'purple'],
        colorused = bulletcolor[rand(0, 4)];
    // Show Bullet //
    this.showpi = function () {
        // Center Bullet//
        ctx.fillStyle = colorused;
        ctx.fillRect(x + 7.5, y - 40, 5, 5);
    };
    // Move Bullet //
    this.movepi = function () {
        this.y = y - speed;
        y = y - speed;
    };
    // Erase Bullet //
    this.erasepi = function () {
        return (y - speed);
    };
}
// Setup Canvas Size //
function setCanvasWidth() {
    "use strict";
    ctx.canvas.width = 800;
    ctx.canvas.height = 700;
}
// Paint Over Canvas For Animation Illusion //
function paintover() {
    'use strict';
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(paintover);
}
// Erase Bullet //
function erasebullet() {
    'use strict';
    if (bullets.length > 0) {
        if (bullets[0].erasepi() < 0) {
            bullets.shift();
        }
    }
    window.requestAnimationFrame(erasebullet);
}
// Draw Bullet //
function drawbullet() {
    'use strict';
    var i;
    for (i = 0; i < bullets.length; i = i + 1) {
        bullets[i].showpi();
        bullets[i].movepi();
    }
    window.requestAnimationFrame(drawbullet);
}
// Draw Invader //
function drawinvader() {
    'use strict';
    var i;
    for (i = 0; i < invaders.length; i = i + 1) {
        invaders[i].showpi();
    }
    window.requestAnimationFrame(drawinvader);
}
// Add Invader In Array //
function makeinvader() {
    'use strict';
    var x = 20,
        y = 20,
        i;
    for (i = 0; i < 13; i = i + 1) {
        invaders.push(new Invader(x, y));
        x = x + 60;
    }
    x = 20;
    for (i = 0; i < 13; i = i + 1) {
        invaders.push(new Invader(x, y + 60));
        x = x + 60;
    }
    x = 20;
    for (i = 0; i < 13; i = i + 1) {
        invaders.push(new Invader(x, y + 120));
        x = x + 60;
    }
    x = 20;
    for (i = 0; i < 13; i = i + 1) {
        invaders.push(new Invader(x, y + 180));
        x = x + 60;
    }
    x = 20;
    for (i = 0; i < 13; i = i + 1) {
        invaders.push(new Invader(x, y + 240));
        x = x + 60;
    }
    x = 20;
    for (i = 0; i < 13; i = i + 1) {
        invaders.push(new Invader(x, y + 300));
        x = x + 60;
    }
}
// Update Score //
function updatescore() {
    'use strict';
    document.getElementById('score').innerHTML = 'Score:' + score;
}
// Detect Collision //
function detect() {
    'use strict';
    var i,
        e;
    for (i = 0; i < bullets.length; i = i + 1) {
        for (e = 0; e < invaders.length; e = e + 1) {
            if (bullets[i].y < (invaders[e].y + 80)) {
                if ((bullets[i].x > (invaders[e].x - 10)) && bullets[i].x < (invaders[e].x + 30)) {
                    bullets.splice(i, 1);
                    invaders.splice(e, 1);
                    score = score + 1;
                    updatescore();
                    break;
                }
            }
        }
    }
    window.requestAnimationFrame(detect);
}
// Move Invaders //
function moveinvader() {
    'use strict';
    var u;
    for (u = 0; u < invaders.length; u = u + 1) {
        invaders[u].movepi();
    }
}
// Draw Ship //
function drawship() {
    'use strict';
    ship.showpi();
    window.requestAnimationFrame(drawship);
}
// Listen For KeyDown //
function pressed(x) {
	'use strict';
	var code = x.keyCode,
        spacebar = 32,
        moveleft = 39,
        moveright = 37,
        moveup = 38,
        movedown = 40,
        i,
        soundfile = new Audio('https://raw.githubusercontent.com/AlimasKuvo/spaceinvader/gh-pages/blop.mp3');
    li = pressedKeys[x.keyCode];
    if (!li) {
        if (code === spacebar) {
            space1 = true;
        }
        if (code === moveright) {
            right1 = true;
        }
        if (code === moveleft) {
            left1 = true;
        }
        if (code === moveup) {
            up1 = true;
        }
        if (code === movedown) {
            down1 = true;
        }
    }
    function firenow() {
        soundfile.play();
        bullets.push(new Bullet(ship.x, ship.y));
        if (bullets.length === 1) {
            // Execute Only Once //
            if (change !== 1) {
                drawbullet();
                erasebullet();
                detect();
                change = 1;
            }
        }
    }
    // Multiple KeyPress Detection //
    function goright() {
        ship.moveright();
        if (right1) {
            window.requestAnimationFrame(goright);
        }
        return;
    }
    function goleft() {
        ship.moveleft();
        if (left1) {
            window.requestAnimationFrame(goleft);
        }
        return;
    }
    function goup() {
        ship.moveup();
        if (up1) {
            window.requestAnimationFrame(goup);
        }
        return;
    }
    function godown() {
        ship.movedown();
        if (down1) {
            window.requestAnimationFrame(godown);
        }
        return;
    }
    if (space1) {
        if (right1) {
            firenow();
            goright();
        } else if (left1) {
            firenow();
            goleft();
        } else {
            firenow();
        }
    }
    if (right1) {
        goright();
    }
    if (left1) {
        goleft();
    }
    if (up1) {
        goup();
    }
    if (down1) {
        godown();
    }
}
// Listen for KeyUp //
function unpressed(x) {
    'use strict';
    var li = pressedKeys[x.keyCode],
        code = x.keyCode,
        spacebar = 32,
        moveleft = 39,
        moveright = 37,
        moveup = 38,
        movedown = 40;
    if (!li) {
        if (code === spacebar) {
            space1 = false;
        }
        if (code === moveright) {
            right1 = false;
        }
        if (code === moveleft) {
            left1 = false;
        }
        if (code === moveup) {
            up1 = false;
        }
        if (code === movedown) {
            down1 = false;
        }
    }
}
// Detect KeyPress Events & Pass To Associated Functions //
window.onkeydown = pressed;
window.onkeyup = unpressed;
// Call Functions //
setCanvasWidth();
paintover();
drawship();
makeinvader();
//setInterval(moveinvader, 4000);
drawinvader();