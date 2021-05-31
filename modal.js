//OPENS SHADOWBOX WITH ONLY NESCESSARY ELEMENTS
function openModal(name, message, hasQuestion, gameOver, hasOpenGame) {
    document.getElementById("name").innerHTML = name;
    document.getElementById("modaltext").innerHTML = message;
    document.getElementById("myModal").style.display = "inline";
    document.getElementById("modalbutton").style.display = "inline";
    if (hasQuestion == true) {
        document.getElementById('text').value = "Answer here";
        document.getElementById("text").style.display = "inline";
        document.getElementById("smbbutton").style.display = "inline";
        document.getElementById("modalbutton").style.display = "inline";
        document.getElementById("savebutton").style.display = "none";
    } else if (hasOpenGame) {
        document.getElementById("btn").style.display = "inline";
        document.getElementById("file").style.display = "inline";
        document.getElementById("file").addEventListener('change', readFileAsString, false);
    } else if (gameOver == true) {
        document.getElementById("savebutton").style.display = "inline";
    }
    freeze();
}

//CLOSES SHADOWBOX & RESETS ELEMENTS
function closeModal() {
    document.getElementById("modalbutton").style.display = "none";
    document.getElementById("smbbutton").style.display = "none";
    document.getElementById("text").style.display = "none";
    document.getElementById("myModal").style.display = "none";
    document.getElementById("btn").style.display = "none";
    unFreeze();
}

//SHADOWBOX TEXT INPUT CONTROL
function submit() {
    var userAns = document.getElementById("text").value;
    if (userAns == ans) {
        document.getElementById('text').value = "correct!";
        unlockersFound.push(new Unlocker(0, 0, modalUnlk));
        document.getElementById('unlockersfound').innerHTML = displayUnlockers(unlockersFound);
        touchedNPC.spoken = true;
        closeModal();
    } else {
        document.getElementById('text').value = "incorrect";
    }
}

//SFHS TSA 2021