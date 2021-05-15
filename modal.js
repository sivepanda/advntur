// Get the modal
var modal = document.getElementById("myModal");

//'onclick' function, randomize events
function openModal(name, message) {
    document.getElementById("name").innerHTML = name;
    document.getElementById("modaltext").innerHTML = message;
    document.getElementById("myModal").style.display = "inline";
    document.getElementById("modalbutton").style.display = "inline";
    freeze();
}

function openModal(name, message, hasQuestion) {
    document.getElementById("name").innerHTML = name;
    document.getElementById("modaltext").innerHTML = message;
    document.getElementById("myModal").style.display = "inline";
    if (hasQuestion == true) {
        document.getElementById('text').value = "Answer here";
        document.getElementById("text").style.display = "inline";
        document.getElementById("smbbutton").style.display = "inline";
        document.getElementById("modalbutton").style.display = "none";
    } else {
        document.getElementById("modalbutton").style.display = "inline";
    }

    freeze();
}

function closeModal() {
    document.getElementById("modalbutton").style.display = "none";
    document.getElementById("modalbutton").style.display = "none";
    document.getElementById("myModal").style.display = "none";
    unFreeze();
}

function submit() {
    var searchValue = document.getElementById("text").value;
    if (searchValue = ans) {
        unlockersFound.push(new Unlocker(0, 0, modalUnlk));
        closeModal();
    } else {
        document.getElementById('text').value = "incorrect";
    }
}