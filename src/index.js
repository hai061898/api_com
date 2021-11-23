const express = require('express');
const path = require('path');

require('dotenv').config();

require('../mongo/database/mongodb');

const app = express();

// Middleware
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

app.use( require('./routes/route') );



app.use( express.static( path.join( __dirname, 'uploads/Profile') ));
// đường đẫn vào thư mục uploads
app.use( express.static( path.join( __dirname, 'uploads/Home' )));
app.use( express.static( path.join( __dirname, 'uploads/Products' )));
app.use( express.static( path.join( __dirname, 'uploads/Categories' )));

//listen port 
app.listen( process.env.PORT, () => console.log('Listen on port ' + process.env.PORT) );