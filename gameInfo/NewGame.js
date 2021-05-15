function clr() {
    window.localStorage.clear();
    window.location.href = 'menu.html';
}

function clearAll() {
    window.localStorage.clear();
}

function promptUserForCitName() {
    var cityName = prompt("Please enter the City name", "Bondland");

    if (cityName == null || cityName == "") {
        if (confirm("You have not named your city. Please select a city name")) {
            promptUserForCitName();
        } else {
            window.location.href = 'home.html';
        }
    } else {
        localStorage.setItem("cit", JSON.stringify(cityName));
    }
}

//SFHS TSA 2020