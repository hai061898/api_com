const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/products', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then( db => console.log('Mongodb is connnected'))
.catch(err => console.log(err));

//đoạn này có trên mạng 
// cài đặt mongodb xong 
// trên teminnal gõ : use + name (products)