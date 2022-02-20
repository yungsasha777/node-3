var xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:1989/jokes', true);
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.onload = function() {
    // do something to response
    console.log(this.responseText);
};

dataToSend = {
    "joke": "ye"
};

xhr.send(JSON.stringify(dataToSend));