var fps = 75;
var level = 0;

//LOADS A NEW GAME
window.onload = function() {
    canv = document.getElementById('game');
    ctx = canv.getContext('2d');

    window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
    window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

    document.addEventListener("keydown", keyPush);

    canv.addEventListener('mousemove', function(evt) {
        mousePos = getMousePos(evt);
    }, false);
    canv.addEventListener('mouseup', (evt) => {
        switch (evt.button) {
            case 0:
                click();
                break;
        }
    });

    p = new Player(coors.x, coors.y);

    updateInterval = setInterval(update, 1000 / fps);

    newLevel();
    openModal("Welcome to advntur", "Use the arrow keys to navigate, and travel to the boxes with exclamination points to get your objectives! Grey boxes with the a number on them are keys some NPCs will also have keys; they will ask you questions)! They are important!<br><br> You can also open a previous game save using the <i>Open Previous Save</i> button below, and selecting a Game(x) file.", false, false, true);

    console.log("Setup Complete");

}

function newLevel() {
    doors = [];
    walls = [];
    world = [];
    world = levels[level].world;

    setWalls(levels[level].world);
    p.x = levels[level].spawnPt.x;
    p.y = levels[level].spawnPt.y;
    setNPCs();
    setUnlockers();
    setDoors();
    setGameOver();
    draw();
}

//LOADS A PRESAVED GAME
function loadGame() {
    p = new Player(saveGame.x, saveGame.y);
    walls = saveGame.walls;
    unlockersFound = saveGame.unlockersFound;
    document.getElementById('unlockersfound').innerHTML = displayUnlockers(unlockersFound);
    npcs = saveGame.npcs;
    unlkrs = saveGame.unlkrs;
    doors = saveGame.doors;
    setGameOver();
    console.log("Setup Complete");

}

function freeze() {
    clearInterval(updateInterval);
}

function unFreeze() {
    updateInterval = setInterval(update, 1000 / fps);
}

function setWalls(levelMap) {
    for (var r = 0; r < levelMap.length; r++) {
        for (var c = 0; c < levelMap[r].length; c++) {
            if (levelMap[r][c] >= 1) {
                walls.push({ x: c * 100, y: r * 100 });
            }
        }
    }
    saveGame.walls = walls;
}

ans = "";
modalUnlk = "";
checkpoint = 0;
unlockersFound = [];

npcs = [];
unlkrs = [];
doors = [];
world = levels[level].world;

coors = { x: levels[level].spawnPt.x, y: levels[level].spawnPt.y };

function setNPCs() {
    npcs = levels[level].npcs;
    saveGame.npcs = npcs;
}

function setUnlockers() {
    unlkrs = levels[level].unlockers;
    saveGame.unlkrs = unlkrs;
}

function setDoors() {
    for (var r = 0; r < world.length; r++) {
        for (var c = 0; c < world[r].length; c++) {
            if (world[r][c] > 1) {
                doors.push(new Door(c * 100 - 10, r * 100 - 10, world[r][c]));
            }
        }
    }
    saveGame.doors = doors;
}

function setGameOver() {
    gameOver = levels[level].endGame;
}

walls = [];
cx = 0;
cy = 0;

ww = world[0].length * 100;
for (var i = 1; i < world.length; i++) {
    if (world[i].length * 100 > ww) {
        ww = world[i].length * 100;
    }
}
wh = world.length * 100;

function update() {
    p.move();
    draw();
}

function draw() {
    //BACKGROUND
    ctx.fillStyle = "turquoise";
    ctx.fillRect(0, 0, canv.height, canv.width);

    //WALLS
    ctx.fillStyle = "black";
    for (var i = 0; i < walls.length; i++) {
        ctx.fillRect(walls[i].x - cx, walls[i].y - cy, 100, 100);
    }

    //DOORS
    for (var i = 0; i < doors.length; i++) {
        ctx.font = 'bold 60px calibri';
        ctx.textAlign = "center";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        if (!doors[i].opened) {
            ctx.fillStyle = "crimson";
            ctx.fillRect(doors[i].x - cx, doors[i].y - cy, 120, 120);
            ctx.fillText("🔒", doors[i].x - cx + doors[i].width / 2, doors[i].y - cy + doors[i].height / 2 + 20);
            ctx.strokeText("🔒", doors[i].x - cx + doors[i].width / 2, doors[i].y - cy + doors[i].height / 2 + 20);
        } else {
            ctx.fillStyle = "green";
            ctx.fillRect(doors[i].x - cx, doors[i].y - cy, 120, 120);
            ctx.fillText("🔓", doors[i].x - cx + doors[i].width / 2, doors[i].y - cy + doors[i].height / 2 + 20);
            ctx.strokeText("🔓", doors[i].x - cx + doors[i].width / 2, doors[i].y - cy + doors[i].height / 2 + 20);
        }

    }

    //PLAYER
    ctx.fillStyle = "black";
    ctx.fillRect(p.x - cx, p.y - cy, p.width, p.height);
    ctx.fillStyle = "red";
    ctx.fillRect(p.x - cx + 5, p.y - cy + 5, p.width - 9, p.height - 9);

    //NPCS
    for (var i = 0; i < npcs.length; i++) {
        ctx.fillStyle = npcs[i].color;
        ctx.fillRect(npcs[i].x - cx, npcs[i].y - cy, 60, 60);

        ctx.font = 'bold 60px calibri';
        ctx.textAlign = "center";
        ctx.fillStyle = "yellow";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        if (!npcs[i].spoken) {
            ctx.fillText("!", npcs[i].x - cx + npcs[i].width / 2, npcs[i].y - cy + npcs[i].height / 2 + 20);
            ctx.strokeText("!", npcs[i].x - cx + npcs[i].width / 2, npcs[i].y - cy + npcs[i].height / 2 + 20);
        }
    }

    //Unlockers
    for (var i = 0; i < unlkrs.length; i++) {
        if (!unlkrs[i].spoken) {
            ctx.fillStyle = unlkrs[i].color;
            ctx.font = 'bold 60px calibri';
            ctx.fillText("🔑", unlkrs[i].x - cx + unlkrs[i].width, unlkrs[i].y - cy + unlkrs[i].height);
            ctx.strokeText("🔑", unlkrs[i].x - cx + unlkrs[i].width, unlkrs[i].y - cy + unlkrs[i].height);
            ctx.textAlign = "center";
            ctx.fillStyle = "green";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            ctx.fillText(unlkrs[i].unlkCode, unlkrs[i].x - cx + unlkrs[i].width, unlkrs[i].y - cy + unlkrs[i].height);
            ctx.strokeText(unlkrs[i].unlkCode, unlkrs[i].x - cx + unlkrs[i].width, unlkrs[i].y - cy + unlkrs[i].height);
        }
    }

    //GameOver
    ctx.fillStyle = gameOver.color;
    ctx.fillRect(gameOver.x - cx, gameOver.y - cy, gameOver.width, gameOver.height);
    ctx.font = 'bold 60px calibri';
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillText("O", gameOver.x - cx + gameOver.width / 2, gameOver.y - cy + gameOver.height / 2 + 20);
    ctx.strokeText("O", gameOver.x - cx + gameOver.width / 2, gameOver.y - cy + gameOver.height / 2 + 20);

    //HUD
}