// Get the modal
var modal = document.getElementById("myModal");

//'onclick' function, randomize events
function openModal(name, message) {
    document.getElementById("name").innerHTML = name;
    document.getElementById("modaltext").innerHTML = message;
    document.getElementById("myModal").style.display = "inline";
    freeze();
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
    unFreeze();
}