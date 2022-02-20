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
        getJokes(req, res);
        return;
    };

    if(req.url == '/jokes' && req.method == 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        addJoke(req, res);
        return;
    };
    
    if(req.url == '/'){
        filePath = path.join(__dirname, 'web-pages', 'main.html');
        content = fs.readFileSync(filePath);
    };

    res.end(content);
});

let jsonToSend
const dataPath = path.join(__dirname, 'data');

function getJokes(req, res) {
    let dir = fs.readdirSync(dataPath);
    let allJokes = [];
    for (let i = 0; i < dir.length; i++) {
        let file = fs.readFileSync(path.join(dataPath, i + '.json'));
        let jokeJson = Buffer.from(file).toString();
        let joke = JSON.parse(jokeJson);
        joke.id = i;

        allJokes.push(joke);
    }
    res.end(JSON.stringify(allJokes));
};

async function addJoke(req, res) {
    console.log('Request received');
    let data = '';
    req.on('data', async function(chunk) {
        data += chunk;
    });
    console.log(data);
    req.on('end', async function() {
        try{
        let joke = await JSON.parse(data);
        joke.likes = 0;
        joke.dislikes = 0;

        let dir = fs.readdirSync(dataPath);
        let fileName = dir.length + '.json';
        let filePath = path.join(dataPath, fileName);
        fs.writeFileSync(filePath, JSON.stringify(joke));
        console.log(joke)

        res.end();
        }catch(error){
            console.log(error)
        }
    });
};

server.listen(1989);
console.log(`server running at http://localhost:${port}`);