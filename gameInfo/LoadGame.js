// document.getElementById('opensavebutton').addEventListener('change', readFileAsString)

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
        wait(500);
        //add load complete message to the bottom or button
    };
}

function wait(ms) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while (d2 - d < ms);
}

//SFHS TSA 2020