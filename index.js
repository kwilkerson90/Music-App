const http = require('http');

const hostname = '127.0.0.1';
const port = 3000; 

const express = require('express');

const app = express(); 

const server = http.createServer(app);

const es6Renderer = require('express-es6-template-engine');
//importing the module and assigning it to the variable es6Renderer
app.engine('html', es6Renderer);
//registering the template engine function and associating it with html files
app.set('views', 'templates');
//telling Express to look in the templates directory for the template ("view") files
app.set('view engine', 'html');
//setting the html template engine as the default for this app 


const songs = require('./app'); 

app.get('/', (req, res) => {
    res.render('home', {
        partials: {
            header: 'partials/header'
        }
    });
    //instead of using res.send to send back whatever, you'll send the contents of the home.html file
    //since you set up the template engine, Express looks in the templates dir by default 
});

app.get('/projects', (req, res) => {
    //adding a second route 
    res.render('albums-list', {
        locals: {
            songs: app,
            path: req.path
        }
    });
});

app.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    //destructuring out the id
    const song = songs[id];

    if (song) {
        res.render('album', {
            locals: {
                song
            },
            partials: {
                header: 'partials/header'
            }
        });
    } else {
        res.status(404)
            .send(`no album with title ${id}`)
    }
});



server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});