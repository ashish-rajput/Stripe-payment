
const express = require('express');
const http = require('http');
require('dotenv').config();


const { APP_CONFIG,DB_CONFIG } = require('./config');

const { PAYMENT } = require('./routes');



//create an express app
const app = express();


// port to use in the app
app.set('port',APP_CONFIG.PORT);


/**
 * Basic middlerWares
 * `logger` to print the http req, res logs
 * `express.json` for parsing the json body data
 * `express.urlencoded` for reach parsing of form body data
 */

app.use(APP_CONFIG.logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', PAYMENT)



// fallback for 404 or other routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: `${req.path} not found`,
    });
});


async function startServer(){

    await DB_CONFIG.connectToDb();

    const server = http.createServer(app);

    server.listen(APP_CONFIG.PORT);

    server.on('error',(err) => console.error(err));

    server.on('listening',() => console.log(`Server running on ${APP_CONFIG.PORT}`));

}

startServer();