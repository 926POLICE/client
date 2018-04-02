import path from 'path';
import http from 'http';
import Express from 'express';

const app = new Express(); // Initialize Express variable
app.set('view engine', 'ejs'); // Setting up the view engine
app.set('views', path.join(__dirname, '..', 'views')); // Setting up the views folder
app.use(Express.static(path.join(__dirname, '..', 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
    // render the index template with the embedded React markup
    return res.render('index');
});

const server = new http.Server(app); // Create a server through Express
server.listen(1337, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:1337`);
});
