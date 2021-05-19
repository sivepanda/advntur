var fps = 75;

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

    setWalls(world);
    setNPCs();
    setUnlockers();
    setDoors();
    setGameOver();
    openModal("Welcome to advntur", "Use the arrow keys to navigate, and travel to the boxes with exclamination points to get your objectives! Grey boxes with the a number on them are keys some NPCs will also have keys; they will ask you questions)! They are important!<br><br> You can also open a previous game save using the <i>Open Previous Save</i> button below, and selecting a Game(x) file.", false, false, true);

    console.log("Setup Complete");

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
world = [
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
];

coors = { x: saveGame.x, y: saveGame.y };

function setNPCs() {
    npcs = [
        new NPC(448, 590, "Maezel", "I'm glad you finally woke up. You have to escape as soon as possible, it's dangerous in here. You're going to have to grab your keys. Hurry! Save yourself! <br>Oh, and remember, you are in the Sneki Room. You need to know this!", 0, false, ""),
        new NPC(420, 1228, "Jeoffri", "You're looking for a key? I think the guard has one, but you'll have to find them. You might want to look down that hall.", 0, false, ""),

        new NPC(532, 1724, "Guard", "HEY! WHAT ARE YOU DOING HERE? <br>Oh, you work here? <br>Well, I can't just take your word for it. Answer me this then, what room did you come from?<br><i>type the name of the room as a single word and lowercase!</i>", 3, true, "sneki")
    ];
    saveGame.npcs = npcs;
}

function setUnlockers() {
    unlkrs = [
        new Unlocker(720, 820, 2)
    ];
    saveGame.unlkrs;
}

function setDoors() {
    for (var r = 0; r < world.length; r++) {
        for (var c = 0; c < world[r].length; c++) {
            if (world[r][c] > 1) {
                doors.push(new Door(c * 100, (r * 100) - 100, world[r][c]));
            }
        }
    }
}

function setGameOver() {
    gameOver = new GameOver(496, 1984);
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
    ctx.fillStyle = "yellow";
    ctx.fillRect(0, 0, canv.height, canv.width);

    //WALLS
    ctx.fillStyle = "gray";
    for (var i = 0; i < walls.length; i++) {
        ctx.fillRect(walls[i].x - cx, walls[i].y - cy, 100, 100);
    }

    //DOORS
    ctx.fillStyle = "crimson";
    for (var i = 0; i < doors.length; i++) {
        ctx.fillRect(doors[i].x - cx, doors[i].y - cy, 100, 100);

    }

    //PLAYER
    ctx.fillStyle = "black";
    ctx.fillRect(p.x - cx, p.y - cy, p.width, p.height);
    ctx.fillStyle = "red";
    ctx.fillRect(p.x - cx + 5, p.y - cy + 5, p.width - 10, p.height - 10);

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
            ctx.fillRect(unlkrs[i].x - cx, unlkrs[i].y - cy, 30, 60);
            ctx.font = 'bold 60px calibri';
            ctx.textAlign = "center";
            ctx.fillStyle = "green";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.fillText(unlkrs[i].unlkCode, unlkrs[i].x - cx + unlkrs[i].width / 2, unlkrs[i].y - cy + unlkrs[i].height / 2 + 20);
            ctx.strokeText(unlkrs[i].unlkCode, unlkrs[i].x - cx + unlkrs[i].width / 2, unlkrs[i].y - cy + unlkrs[i].height / 2 + 20);
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