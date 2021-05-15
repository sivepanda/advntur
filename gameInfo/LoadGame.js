document.getElementById('file').addEventListener('change', readFileAsString)

function readFileAsString() {
    var files = this.files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(event) {
        console.log('File content:', event.target.result);
    };

    reader.readAsText(files[0]);
    reader.onloadend = function() {
        console.log('DONE', reader.readyState);
        console.log(reader.result);
        result = reader.result;
        city = result.slice(result.indexOf("]") + 2, result.length - 1);
        playerNames = (result.slice(0, result.indexOf("]") + 1));
        localStorage.setItem("players", playerNames);
        localStorage.setItem("cit", city);
        wait(500);
        window.location.href = 'secondarymenu.html';
        //add load complete message to the bottom or button
    };
}

function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}

function decodeCityName(s) {

}

//SFHS TSA 2020