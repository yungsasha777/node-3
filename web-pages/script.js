var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    document.getElementById('title').innerText = xhttp.responseText
};
xhttp.open("GET", "http://localhost:1989/jokes", true);
xhttp.send();