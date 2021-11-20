const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();


//listen port 
app.listen( process.env.PORT, () => console.log('Listen on port ' + process.env.PORT) );