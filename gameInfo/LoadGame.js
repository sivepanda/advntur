//READS INPUTTED FILE AND SETS GAME OBJ TO FILE DATA
function readFileAsString() {
    var files = this.files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();

    reader.readAsText(files[0]);
    reader.onloadend = function() {
        console.log('DONE', reader.readyState);
        result = reader.result;
        saveGame = JSON.parse(result);
        draw();
        wait(500);
        loadGame();
        closeModal();
        //add load complete message to the bottom or button
    };
}


//WAIT FUNCTION
function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}

//SFHS TSA 2021