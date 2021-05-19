//'onclick' function, randomize events

function openModal(name, message, hasQuestion, gameOver, hasOpenGame) {
    document.getElementById("name").innerHTML = name;
    document.getElementById("modaltext").innerHTML = message;
    document.getElementById("myModal").style.display = "inline";
    document.getElementById("modalbutton").style.display = "inline";
    if (hasQuestion == true) {
        document.getElementById('text').value = "Answer here";
        document.getElementById("text").style.display = "inline";
        document.getElementById("smbbutton").style.display = "inline";
        document.getElementById("modalbutton").style.display = "none";
    } else if (hasOpenGame) {
        document.getElementById("btn").style.display = "inline";
        document.getElementById("file").style.display = "inline";
        document.getElementById("file").addEventListener('change', readFileAsString, false);
    } else if (gameOver == true) {
        document.getElementById("savebutton").style.display = "inline";
    }
    freeze();
}

function closeModal() {
    document.getElementById("modalbutton").style.display = "none";
    document.getElementById("smbbutton").style.display = "none";
    document.getElementById("text").style.display = "none";
    document.getElementById("myModal").style.display = "none";
    document.getElementById("btn").style.display = "none";
    unFreeze();
}

function submit() {
    var userAns = document.getElementById("text").value;
    if (userAns == ans) {
        document.getElementById('text').value = "correct!";
        unlockersFound.push(new Unlocker(0, 0, modalUnlk));
        closeModal();
    } else {
        document.getElementById('text').value = "incorrect";
    }
}