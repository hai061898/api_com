const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();

app.use( require('./routes/route') );


app.use( express.static( path.join( __dirname, 'uploads/Profile') ));
// đường đẫn vào thư mục uploads
app.use( express.static( path.join( __dirname, 'uploads/Home' )));
app.use( express.static( path.join( __dirname, 'uploads/Products' )));
app.use( express.static( path.join( __dirname, 'uploads/Categories' )));

//listen port 
app.listen( process.env.PORT, () => console.log('Listen on port ' + process.env.PORT) );