var xhttp = new XMLHttpRequest();
let responseJson = [];
xhttp.open("GET", "http://localhost:1989/jokes", true);
xhttp.send();
xhttp.onreadystatechange = function() {
    responseJson = JSON.parse(xhttp.responseText);
    const randomNumber = Math.floor(Math.random() * responseJson.length);
    document.getElementById('title').innerText = responseJson[randomNumber].joke
};