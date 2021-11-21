const jwt = require('jsonwebtoken');



const validateToken = ( req, res, next ) => {

    let token = req.header('xx-token');
    // lấy hearder 

    if( !token ){
        return res.status(401).json({
            resp: false,
            msj : "There is not Token in the request"
        });
    }
    // khác token thì xuất ra thông báo lỗi

    try {

        // thêm key JwtTOKEN 
        const { uid } = jwt.verify( token, process.env.KEY_JWTOKEN );

        req.uid = uid;

        next();
        
    } catch (e) {
        //nếu k đc trả về lỗi 
        return res.status(401).json({
            resp: false,
            msj : 'Invalid Token',
            users: {},
            token: 'Invalid Token'
        });
    }

}

module.exports = {
    validateToken
}