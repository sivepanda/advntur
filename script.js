class Player {
    x = 0;
    y = 0;
    width = 60;
    height = 60;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    speed = 4;

    move() {
        if (Key.isDown(Key.SHIFT)) this.speed = 6;
        if (Key.isDown(Key.UP) || Key.isDown(Key.W)) this.forward();
        if (Key.isDown(Key.LEFT) || Key.isDown(Key.A)) this.left();
        if (Key.isDown(Key.DOWN) || Key.isDown(Key.S)) this.back();
        if (Key.isDown(Key.RIGHT) || Key.isDown(Key.D)) this.right();

        cx = this.x + this.width / 2 - canv.width / 2;
        cy = this.y + this.width / 2 - canv.width / 2;

        if (cx < 0) {
            cx = 0;
        }
        if (cy < 0) {
            cy = 0;
        }
        if (cx > ww - canv.width) {
            cx = ww - canv.width;
        }
        if (cy > wh - canv.height) {
            cy = wh - canv.height;
        }

        this.speed = 4;

        document.getElementById('playerloc').innerHTML = this.x + " " + this.y;
    }

    forward() {
        this.y -= this.speed;
        while (this.colliding()) {
            this.y += 1;
        }
        if (this.touchingNPC()) {
            this.y += this.speed;
        }
    }
    left() {
        this.x -= this.speed;
        while (this.colliding()) {
            this.x += 1;
        }
        if (this.touchingNPC()) {
            this.x += this.speed;
        }
    }
    back() {
        this.y += this.speed;
        while (this.colliding()) {
            this.y -= 1;
        }
        if (this.touchingNPC()) {
            this.y -= this.speed;
        }
    }
    right() {
        this.x += this.speed;
        while (this.colliding()) {
            this.x -= 1;
        }
        if (this.touchingNPC()) {
            this.x -= this.speed;
        }
    }

    colliding() {
        for (var i = 0; i < walls.length; i++) {
            if (
                this.x + this.width > walls[i].x &&
                this.x < walls[i].x + 100 &&
                this.y + this.height > walls[i].y &&
                this.y < walls[i].y + 100
            ) {
                return true;
            }
        }
        return false;
    }

    touchingNPC() {
        for (var i = 0; i < npcs.length; i++) {
            if (
                this.x + this.width > npcs[i].x &&
                this.x < npcs[i].x + npcs[i].width &&
                this.y + this.height > npcs[i].y &&
                this.y < npcs[i].y + npcs[i].height &&
                !npcs[i].spoken
            ) {
                npcs[i].spoken = true;
                openModal(npcs[i].name, npcs[i].message);
                clearEvents();
                return true;
            }
        }
        return false;
    }
}

class NPC {
    x = 0;
    y = 0;
    height = 60;
    width = 60;

    color = "brown";

    name = "";
    message = "";
    spoken = false;

    constructor(x, y, name, mess) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.message = mess;
    }
}

class Keys {
    x = 0;
    y = 0;
    height = 60;
    width = 30;

    color = "grey";

    name = "";
    message = "";
    spoken = false;

    constructor(x, y, name, mess) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.message = mess;
    }
}

//CONTROLS ------------------------------------

//held keys (movement)
var Key = {
    _pressed: {},

    LEFT: 37,
    A: 65,
    UP: 38,
    W: 87,
    RIGHT: 39,
    D: 68,
    DOWN: 40,
    S: 83,
    SHIFT: 16,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
        keycodes.push(event.keyCode);
    },

    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
        keycodes.splice(keycodes.indexOf(event.keyCode), 1);
    }
};

keycodes = [];

function clearEvents() {
    if (keycodes.length > 0) {
        Key.onKeyup({ keyCode: keycodes[0] });
    }
    if (keycodes.length > 0) {
        clearEvents();
    }

    keycodes = [];
}

//pressed keys
function keyPush(evt) {
    switch (evt.keyCode) {
        case 32: //SPACEBAR
            break;
    }
}

//mouse click
function getMousePos(evt) {
    var rect = canv.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function click() {
    var mouseX = mousePos.x;
    var mouseY = mousePos.y;
}