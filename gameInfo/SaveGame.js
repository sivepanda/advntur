function createSave() {
    var ply = localStorage.getItem("players");
    var city = localStorage.getItem("cit");
    return ply + city;
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Start file download.
function save() {
    download("Game.txt", createSave());
}

//SFHS TSA 2020