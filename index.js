const http = require('http');

const hostname = '127.0.0.1';
const port = 3000; 

const express = require('express');

const app = express(); 

const es6Renderer = require('express-es6-template-engine');
//importing the module and assigning it to the variable es6Renderer
app.engine('html', es6Renderer);
//registering the template engine function and associating it with html files
app.set('views', 'templates');
//telling Express to look in the templates directory for the template ("view") files
app.set('view engine', 'html');
//setting the html template engine as the default for this app 

const server = http.createServer(app);

const songs = require('./app'); 

app.get('/', (req, res) => {
    res.render('home');
    //instead of using res.send to send back whatever, you'll send the contents of the home.html file
    //since you set up the template engine, Express looks in the templates dir by default 
});

app.get('/songs', (req, res) => {
    //adding a second route 
    res.render('albums-list', {
        locals: {
            songs: app
        }
    });
});

app.get('/songs/:name', (req, res) => {
    const {name} = req.params;
    const song = songs.find(f => f.name === name);
    if (song) {
        res.render('album', {
            locals: {
                songs
            }
        });
    } else {
        res.status(404)
            .send(`no album with title ${name}`)

    // let htmlData = ``;
    // htmlData += `<h1>${song.name}</h1>`;
    // htmlData += `<h3>${song.publishDate}</h1>`;
    // htmlData += `<h3>${song.songTitles}</h1>`;
    // res.send(htmlData);
    // } else {
    //     res.status(404)
    //         .send(`no album with title ${name}`)
    //     //we use the chaining syntax to set the status code and then send() the response 
    }
});



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});