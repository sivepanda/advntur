//CLASSES   --------------------------------------------------
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

        this.touchingDoor();

        this.speed = 4;

        document.getElementById('playerloc').innerHTML = this.x + " " + this.y;
        saveGame.x = this.x;
        saveGame.y = this.y;
    }

    forward() {
        this.y -= this.speed;
        while (this.colliding()) {
            this.y += 1;
        }
        if (this.touchingNPC() || this.touchingUnlocker() || this.touchingGameOver()) {
            this.y += this.speed;
        }
    }
    left() {
        this.x -= this.speed;
        while (this.colliding()) {
            this.x += 1;
        }
        if (this.touchingNPC() || this.touchingUnlocker() || this.touchingGameOver()) {
            this.x += this.speed;
        }
    }
    back() {
        this.y += this.speed;
        while (this.colliding()) {
            this.y -= 1;
        }
        if (this.touchingNPC() || this.touchingUnlocker() || this.touchingGameOver()) {
            this.y -= this.speed;
        }
    }
    right() {
        this.x += this.speed;
        while (this.colliding()) {
            this.x -= 1;
        }
        if (this.touchingNPC() || this.touchingUnlocker() || this.touchingGameOver()) {
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
                if (!npcs[i].hasQuestion) {
                    npcs[i].spoken = true;
                }
                openModal(npcs[i].name, npcs[i].message, npcs[i].hasQuestion, false, false);
                ans = npcs[i].answer;
                modalUnlk = npcs[i].unlkCode;
                touchedNPC = npcs[i];
                clearEvents();
                return true;
            }
        }
        return false;
    }

    touchingUnlocker() {
        for (var i = 0; i < unlkrs.length; i++) {
            if (
                this.x + this.width > unlkrs[i].x &&
                this.x < unlkrs[i].x + unlkrs[i].width &&
                this.y + this.height > unlkrs[i].y &&
                this.y < unlkrs[i].y + unlkrs[i].height &&
                !unlkrs[i].spoken
            ) {
                unlkrs[i].spoken = true;
                unlockersFound.push(unlkrs[i]);
                saveGame.unlockersFound = unlockersFound;
                if (unlkrs[i].unlkCode == 2) {
                    openModal("Congratulations!", "You just found your first key!", false, false, false);
                } else if (unlkrs[i].unlkCode >= 10) {
                    unlockersFound.splice(0, 1);
                }
                document.getElementById('unlockersfound').innerHTML = displayUnlockers(unlockersFound);
                clearEvents();
                checkpoint++;
                return true;
            }
        }
        return false;
    }

    touchingGameOver() {
        if (
            this.x + this.width > gameOver.x &&
            this.x < gameOver.x + gameOver.width &&
            this.y + this.height > gameOver.y &&
            this.y < gameOver.y + gameOver.height
        ) {
            if (level < levels.length - 1) {
                openModal("Congratulations!", "Level " + (level + 1) + " is COMPLETE!", false, true, false);
                clearEvents();
                level++;
                saveGame.level += 1;
                document.getElementById('level').innerHTML = (level + 1);
                newLevel();
            } else {
                openModal("Congratulations!", "YOU JUST BEAT THE GAME!", false, false, true);
            }

            return true;
        }
        return false;
    }

    touchingDoor() {
        for (var i = 0; i < doors.length; i++) {
            if (
                this.x + this.width > doors[i].x &&
                this.x < doors[i].x + doors[i].width &&
                this.y + this.height > doors[i].y &&
                this.y < doors[i].y + doors[i].height &&
                !doors[i].opened
            ) {

                for (var j = 0; j < walls.length; j++) {
                    var wall = walls[j];
                    if (doors[i].x + 10 == wall.x && doors[i].y + 10 == wall.y) {
                        for (var k = 0; k < unlockersFound.length; k++) {
                            if (unlockersFound[k].unlkCode == doors[i].unlkKey) {
                                doors[i].opened = true;
                                walls.splice(j, 1);
                                draw();
                                saveGame.doors.push(doors[i]);
                                return null;
                            }
                        }
                    }
                }
                if (!doors[i].spoken) {
                    doors[i].spoken = true;
                    openModal("You Need A Key", "Go look around to find a key!<br>" + "You need key " + doors[i].unlkKey, false, false, false);
                }
            }
        }
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

    constructor(x, y, name, mess, unlkCode, hasQuestion, answer) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.message = mess;
        this.unlkCode = unlkCode;
        this.hasQuestion = hasQuestion;
        this.answer = answer;
    }
}

class Unlocker {
    x = 0;
    y = 0;
    height = 60;
    width = 30;

    color = "grey";

    name = "";
    unlkCode = "";
    spoken = false;
    opened = false;

    constructor(x, y, unlkCode) {
        this.x = x;
        this.y = y;
        this.unlkCode = unlkCode;
    }
}

class Door {
    x = 0;
    y = 0;
    height = 120;
    width = 120;

    color = "brown";

    name = "";
    message = "";
    spoken = false;

    constructor(x, y, unlkKey) {
        this.x = x;
        this.y = y;
        this.unlkKey = unlkKey;
    }

}

class GameInfo {
    constructor(level, x, y, npcs, unlkrs, checkpoint, unlockersFound, walls, doors, gameOver) {
        this.level = level;
        this.x = x;
        this.y = y;
        this.npcs = npcs;
        this.unlkrs = unlkrs;
        this.checkpoint = checkpoint;
        this.unlockersFound = unlockersFound;
        this.walls = walls;
        this.doors = doors;
        this.gameOver = gameOver;
    }
}

class Level {
    constructor(world, spawnPt, npcs, unlockers, endGame) {
        this.world = world;
        this.spawnPt = spawnPt;
        this.npcs = npcs;
        this.unlockers = unlockers;
        this.endGame = endGame;
    }
}

class SpawnPt {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class GameOver {
    height = 60;
    width = 60;
    color = "blue";
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

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
    ESC: 27,

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

function closeOnEsc() {
    if (Key.isDown(Key.ESC)) {
        closeModal();
    }
}

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

function displayUnlockers(arr) {
    var ret = "";
    for (var i = 0; i < arr.length; i++) {
        ret += arr[i].unlkCode + "<br>";
    }
    return ret;
}

var saveGame = new GameInfo(0, 450, 450, [], [], [], [], [], [], []);

var levels = [new Level([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 3, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
], new SpawnPt(450, 450), [
    new NPC(448, 590, "Maezel", "I'm glad you finally woke up. You have to escape as soon as possible, it's dangerous in here. You're going to have to grab your keys. Hurry! Save yourself! <br>Oh, and remember, you are in the Sneki Room. You need to know this!", 0, false, ""),
    new NPC(420, 1228, "Jeoffri", "You're looking for a key? I think the guard has one, but you'll have to find them. You might want to look down that hall.", 0, false, ""),
    new NPC(532, 1724, "Guard", "HEY! WHAT ARE YOU DOING HERE? <br>Oh, you work here? <br>Well, I can't just take your word for it. Answer me this then, what room did you come from?<br><i>type the name of the room as a single word and lowercase!</i>", 3, true, "sneki")
], [new Unlocker(720, 820, 2)], new GameOver(496, 1984, "blue")), new Level([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 6, 1],
    [1, 1, 2, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 5, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 4, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 1, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 8, 0, 5, 0, 7, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
], new SpawnPt(110, 110), [
    new NPC(760, 924, "Dieran", "Thank goodness you finally found me! I've been hiding here for days. Look, I know now is not the time, but can you answer this riddle for me?<br>Blue in the day, black at night, everyone wants to know when I cry. What am I?<br><i>type the answer as a single word and lowercase!</i>", 7, true, "sky"),
    new NPC(408, 1520, "Naeas", "Alfred? I'm suprised you escaped the Sneki Room. You've still got some more rooms to escape, though. Anyway, I heard you like riddles.<br>How many months of the year have 28 days<br><i>type the answer as a single word and lowercase!</i>", 8, true, "twelve")
], [new Unlocker(116, 1220, 4), new Unlocker(312, 1132, 5), new Unlocker(915, 115, 6)], new GameOver(532, 1828, "blue")), new Level([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 9, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 16, 1, 12, 0, 0, 1, 0, 0, 17, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 14, 0, 1, 13, 0, 15, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
], new SpawnPt(100, 100), [
    new NPC(1420, 1212, "Mefesta", "  to the Labyrinth! You need to remeber to beware of the odd key out. <br>Now, one question, what has keys that do not unlock anything?<br><i>type the answer as a single word and lowercase!</i>", 12, true, "keyboard")
], [new Unlocker(1828, 320, 9), new Unlocker(608, 320, 10), new Unlocker(2248, 720, 11), new Unlocker(1432, 1324, 12), new Unlocker(1220, 1424, 13), new Unlocker(1530, 1420, 14), new Unlocker(1020, 1440, 15), new Unlocker(1610, 1300, 16), new Unlocker(608, 1412, 17)], new GameOver(2292, 1416, "blue"))];