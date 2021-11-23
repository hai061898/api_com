const {response} = require('express');
const bcrypt = require('bcrypt');
const { generarJsonWebToken } = require('../mongo/src/helpers/jwtoken');
const Users = require('../models/user_model');


const LoginUsuario = async ( req, res = response ) => {

    const { email, passwordd } = req.body;

    Users.findOne({ email: email }, async ( err , usersdb ) => {
        // lấy 1 trị (findOne (điều kiện email = email ))

        if( err ){
            return res.status(500).json({
                resp: false,
                msj : 'Error login',
                err
            });
        } // 500 Internal Server Error

        if( !usersdb ){
            return res.status(400).json({
                resp: false,
                msj : 'Wrong Credentials'
            }); 
        }

        if( !bcrypt.compareSync( passwordd, usersdb.passwordd )){
            return res.status(400).json({
                resp: false,
                msj : 'Wrong Credentials'
            });
        } // so sáng passwork nếu sai xuất ra lỗi trên 

        let token = await generarJsonWebToken( usersdb.person_id );
        // đợi hoạt đông tạo token (await generarJsonWebToken)

        res.json({
            resp: true,
            msj : 'Welcome to Shop',
            users: { 'id': usersdb.person_id, 'email': usersdb.email, 'users' : usersdb.users, 'profile' : usersdb.image },
            token: token
        });


    });
}



const RenweToken = async ( req, res = response ) => {

   const uid = req.uid;

   const token = await generarJsonWebToken( uid );

    Users.findOne({ person_id: uid }, ( err, usersdb ) => {

        console.log(usersdb);

        if( err ){
            return res.status(500).json({
                resp: false,
                msj : 'Error  login',
                err
            });
        }

        res.json({
            resp: true,
            msj : 'Welcome to Frave Shop',
            users: { 'id': usersdb.person_id, 'email': usersdb.email, 'users' : usersdb.users, 'profile' : usersdb.image },
            token: token
        });

    });

}


module.exports = {
    LoginUsuario,
    RenweToken,
};