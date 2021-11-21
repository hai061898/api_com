const jwt = require('jsonwebtoken');



const generarJsonWebToken = ( uid ) => {

    return new Promise( ( resolve, reject ) => {
        // như lời hứa phản hoàn thành 

        const payload = { uid };
        //biến payload 

        jwt.sign( payload, process.env.KEY_JWTOKEN, { 
            // sign giống như hàm trả về token 
            //jwt.sign(payload, secretOrPrivateKey, [options, callback])
            expiresIn: '12h' // gia hạn nó trong 12 giờ 
        }, ( err, token ) => {

            if( !err ){ resolve( token ); } // khác lỗi trả về token
            else { reject( 'The Token cannot be generated' ); } // trả về lỗi

        });

    });   
}

module.exports = {
    generarJsonWebToken,
}