const { response } = require('express'); 
const pool = require('../dataBase/dataBase');
//gọi thư viên database
const bcrypt = require('bcrypt');
//gọi thư viên mã hóa 


const createUsers = async ( req, res = response ) => {

    const { username, email, passwordd } = req.body;
    // tạo biến hằng request 

    const salt = bcrypt.genSaltSync();
    // biến khởi tạo hàm băm
    const pass = bcrypt.hashSync( passwordd, salt );
    //gọi hàm mã hóa thực thi mã hóa password 

    const hasEmail = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
    // gọi câu lệnh sql 
    if( hasEmail.length == 0 ){
        //nếu mảng = 0 
        await pool.query(`CALL SP_REGISTER_USER(?,?,?);`, [ username, email, pass ]);
        // gọi producedure và tham số
        return res.json({
            //trả về json 
            resp: true, // phản hồi true 
            msg: 'User' + username + 'was created successfully!'
        });
    
    } else {
        //ngược lại trả về false  
        return res.json({
            resp: false,
            msj : 'The mail is already registered!'
        }); 
    }
};



module.exports = {
    createUsers
};
//gọi tên file cho việc sử dụng ở các file khác