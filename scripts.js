// Get Random //
function rand(min, max) {
    "use strict";
    return Math.floor((Math.random() * max) + min);
}

// Setup Canvas //
var canvas = document.querySelector("#make"),
    ctx = canvas.getContext("2d"),
    change;

// Create Ship //
function Ship(x, y) {
    'use strict';
    
    // Set X and Y Position //
    this.x = x;
    this.y = y;
    
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
        this.x = x + 5;
        x = x + 5;
        
    };

    // Move Right //
    this.moveright = function () {
        this.x = x - 5;
        x = x - 5;
    };

}
// Variables //
var dropi = [],
    soundfile = new Audio('https://raw.githubusercontent.com/AlimasKuvo/spaceinvader/gh-pages/blop.mp3'),
    ship = new Ship(window.innerWidth / 2, window.innerHeight - 30);


// Create Drop //
function Drop(x, y) {
    'use strict';
    
    // Set X and Y Position //
    this.x = x;
    this.y = y;
    
    // Set Speed //
    var speed = 3;
    
    // Show Drop //
    this.showpi = function () {
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y - 40, 20, 20);
    };
    
    // Move Drop //
    this.movepi = function () {
        y = y - speed;
    };
    
    // Erase Drop //
    this.erasepi = function () {
        return (y - speed);
    };
}


// Setup Canvas Size //
function setCanvasWidth() {
    "use strict";
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

// Paint Over Canvas For Animation Illusion //
function paintover() {
    'use strict';
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    window.requestAnimationFrame(paintover);
}

// Get New Drops //
var drop = new Drop(window.innerWidth / 2, window.innerHeight - 40);

// Erase Drop //
function erasedrop() {
    'use strict';
    if (dropi.length > 0) {
        if (dropi[0].erasepi() < 0) {
            dropi.shift();
        }
    }
    window.requestAnimationFrame(erasedrop);
}

// Draw Drop //
function drawdrop() {
    'use strict';
    var i;
    for (i = 0; i < dropi.length; i = i + 1) {
        dropi[i].showpi();
        dropi[i].movepi();
    }
    window.requestAnimationFrame(drawdrop);
}

// Draw Ship //
function drawship() {
    'use strict';
    ship.showpi();
    window.requestAnimationFrame(drawship);
}

// Listen For Key Press //
window.addEventListener('keydown', function pressed(x) {
	'use strict';
	var code = x.keyCode,
        soundfile = new Audio('http://www.downloadfreesound.com/wp-content/uploads/2014/07/Beep4.mp3'),
        moveleft = 39,
        moveright = 37;
	if (code === 32) {
        soundfile.play();
        dropi.push(new Drop(ship.x, window.innerHeight));
        if (dropi.length === 1) {
            // Execute Only Once //
            if (change !== 1) {
                drawdrop();
                erasedrop();
                change = 1;
            }
        }
    } else if (code === moveright) {
        ship.moveright();
    } else if (code === moveleft) {
        ship.moveleft();
    }
});

// Animate Canvas //
setCanvasWidth();
paintover();
drawship();