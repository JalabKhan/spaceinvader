////  Developer: JALAB KHAN  ////
// Setup Canvas, Variables, Booleans, Arrays //
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
    score = 0,
    fireaudio = new Audio('https://raw.githubusercontent.com/AlimasKuvo/spaceinvader/gh-pages/blop.mp3'),
    invaderaudio = new Audio('https://raw.githubusercontent.com/AlimasKuvo/spaceinvader/gh-pages/foosh.mp3'),
    shiphit = false;
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
// Invader Color //
	invadercolor = ['red', 'yellow', 'blue', 'green', 'purple'],
	randominvadercolor = invadercolor[rand(0, 4)];
    // Show Invader //
    this.showpi = function () {
        ctx.fillStyle = '#699bff';
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
    ship = new Ship(800 / 2, 500);
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
        if (bullets[0].erasepi() < 40) {
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
        y = (10 - 380),
        i;
    for (i = 0; i < 78; i = i + 1) {
        invaders.push(new Invader(x, y));
        x = x + 60;
        if (invaders.length === 13) {
            x = 20;
            y = y + 60;
        } else if (invaders.length === 26) {
            x = 20;
            y = y + 60;
        } else if (invaders.length === 39) {
            x = 20;
            y = y + 60;
        } else if (invaders.length === 52) {
            x = 20;
            y = y + 60;
        } else if (invaders.length === 65) {
            x = 20;
            y = y + 60;
        } else if (invaders.length === 78) {
            x = 20;
            y = y + 60;
        }
    }
}
// Update Score //
function updatescore() {
    'use strict';
    if (!shiphit) {
        document.getElementById('score').innerHTML = 'Score:' + score;
        if (invaders.length === 0) {
            makeinvader();
        }
    } else {
        return;
    }

}
// Detect Collision of Invader with Bullet Only//
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
    invaderaudio.play();
    for (u = 0; u < invaders.length; u = u + 1) {
        invaders[u].movepi();
    }
    if (!shiphit) {
        if (score > -1 && score < 77) {
            setTimeout(moveinvader, 1500);
        } else if (score >= 77 && score < 155) {
            setTimeout(moveinvader, 1000);
        } else if (score >= 155 && score < 232) {
            setTimeout(moveinvader, 600);
        } else if (score >= 232 && score < 309) {
            setTimeout(moveinvader, 300);
        } else if (score >= 309) {
            setTimeout(moveinvader, 150);
        }
        
    } else {
        document.getElementById('status').innerHTML = 'Game Over';
        invaders = [];
        return;
    }
}
// Draw Ship //
function drawship() {
    'use strict';
    if (!shiphit) {
        ship.showpi();
        window.requestAnimationFrame(drawship);
    } else {
        return;
    }
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
        i;
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
        if (!shiphit) {
            fireaudio.play();
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
// Reset Function //
function resetgame() {
    'use strict';
    location.reload(true);
}
// Check Invader Location for Collision with Ship Only//
function invaderlocation() {
    'use strict';
    var i;
    for (i = 0; i < invaders.length; i = i + 1) {
        if (invaders[i].y > (ship.y - 70) && (ship.x > (invaders[i].x - 20)) && ship.x < (invaders[i].x + 40)) {
            shiphit = true;
        } else if (invaders[i].y > (ship.y - 40) && (ship.x > (invaders[i].x - 50)) && ship.x < (invaders[i].x + 70)) {
            shiphit = true;
        } else if (invaders[i].y > canvas.height - 80) {
            shiphit = true;
        }
    }
    window.requestAnimationFrame(invaderlocation);
}
// Detect KeyPress Events & Pass To Associated Functions //
window.onkeydown = pressed;
window.onkeyup = unpressed;
// Call Functions //
setTimeout(function () {
    'use strict';
    setCanvasWidth();
    paintover();
    drawship();
    makeinvader();
    moveinvader();
    invaderlocation();
    drawinvader();
}, 1000);
