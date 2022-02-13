const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 1989;
const fetch = require('node-fetch')

let cssfile; let jsfile; let filePath;
let content = 'na';

uptodate();

function uptodate() {
    fs.readFile('./web-pages/style.css', function(err, html) {
        if (err) {
            throw err;
        }
        cssfile = html;
    });

    fs.readFile('./web-pages/script.js', 'utf-8', function(err, html) {
        if (err) {
            throw err;
        }
        jsfile = html;
    });

    setTimeout(uptodate, 1000);
};

const server = http.createServer(async(req, res)=>{
    if (req.url.indexOf('.css') != -1) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(cssfile);
        res.end();
        return;
    };

    if (req.url.indexOf('.js') != -1) {
        res.writeHead(200, { 'Content-Type': 'text/js' });
        res.write(jsfile);
        res.end();
        return;
    };

    if(req.url == '/jokes' && req.method == 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        getJoke(req, res);
    };
    
    filePath = path.join(__dirname, 'web-pages', 'main.html');
    if (content == 'na') content = fs.readFileSync(filePath);

    res.end(content);
});

let jsonToSend

function getJoke(req, res) {
    fs.readdir('./data', (err, files) => {
        jsonToSend = JSON.parse(fs.readFileSync(`./data/${Math.floor(Math.random() * files.length)}.json`, 'utf-8'));
        console.log(jsonToSend.joke)
        content = jsonToSend.joke
    });
};

server.listen(1989);
console.log(`server running at http://localhost:${port}`);