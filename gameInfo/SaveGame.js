//CONVERT DATA TO DOWLOADABLE FILE
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
    download("Game.txt", JSON.stringify(saveGame));
}




//SFHS TSA 2021