const { validationResult } = require("express-validator")



const ValidatedAuth = (req, res, next) => {

    const errors = validationResult( req );
    // gọi biến để sử dụng thư viện 

    if( !errors.isEmpty() ){
        // nếu nó khác isEmpty (trống) trả về lỗi này

        return res.status(400).json({
            resp: false,
            errors : errors.mapped()
        });
    }

    next();

}

module.exports = {
    ValidatedAuth
}