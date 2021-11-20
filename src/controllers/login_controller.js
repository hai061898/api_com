const {response} = require('express');
const pool = require('../DataBase/DataBase');
const bcrypt = require('bcrypt');
const { generarJsonWebToken } = require('../Helpers/JWToken');


const LoginUser = async ( req, res = response ) => {

    const { email, passwordd } = req.body;
    // taọ 1 biến hằng request

    const rows = await pool.query(`CALL SP_VALIDATE_LOGIN(?);`, [ email ]);
    // gọi procedure tham số email

    if( rows[0].length > 0 ){
        // nếu mảng >0 tức có email tồn tại
        const users = rows[0][0];
        // tạo biến để chứa data  (dataset vd: trả về 'id' : users.persona_id )
        let validatedPassword = await bcrypt.compareSync( passwordd, users.passwordd );
        // giống như so sánh mã hóa có tương thích k 
        if( validatedPassword ){
            // nếu tương thích 
            let token = await generarJsonWebToken( users.persona_id );
            // khỏi tạo token để xác thực 
            return res.json({
                resp: true,
                msj : 'Welcome to Shop', // message trả về Welcome to Shop
                users: { 'id': users.persona_id, 'email': users.email, 'users' : users.users, 'profile' : users.image },
                // trả thôn tin các biến trên 
                token: token // trả biển token 
            });
        
        } else {
            // nếu k đúng trả về lỗi 400 cái này lên tìm giao thức http là bk 
            return res.status(400).json({
                resp: false,
                msj : 'Wrong Credentials',
                users: { 'id': 0000, 'email': 'invalid', 'users' : 'invalid' },
                token: 'invalid'
            });
        }

    } else {
        // chiều dài mảng >0 
        return res.status(400).json({
            resp: false,
            msj : 'Wrong Credentials',
            users: { 'id': 0000, 'email': 'invalid', 'users' : 'invalid' },
            token: 'invalid'
        });
    }
}

const RenweToken = async ( req, res = response ) => {
    // làm mới token 
   const uid = req.uid;

   const token = await generarJsonWebToken( uid );
   // biến khởii tạo token
   const rows = await pool.query(`CALL SP_RENEW_TOKEN(?);`, [ uid ]);
    //gọi procedure vơi tham số uid 
   const users = rows[0][0];
    //tạo mảng để chứa dữ trả về 
   return res.json({
        resp: true,
        msj : 'Welcome to Shop',
        users: { 'id': users.persona_id, 'email': users.email, 'users' : users.users, 'profile' : users.image },
        token: token
    });
}


module.exports = {
    LoginUser,
    RenweToken,
};