const { response } = require('express');
const Users = require('../models/users_model');
const bcrypt = require('bcrypt');
const Person = require('../models/person_model');


const createUsers = async ( req, res = response ) => {

    const { username, email, passwordd } = req.body;

    const salt = bcrypt.genSaltSync();
    const pass = bcrypt.hashSync( passwordd, salt );

    const person = new Person({
        firstName: username
    });
    // gọi biến cho class person 


    person.save( (err, persondb ) => {
    //gọi hàm save 
        if( err ){
            return res.status.apply(400).json({
                resp: false,
                msj : 'Error inserting person data',
                err
            });
        } // nếu lỗi in ta câu trên 

        const user = new Users({
            users: username,
            email: email,
            passwordd: pass,
            person_id: persondb._id
        }); // gọi biến cho class user

        user.save( (err, userdb ) => {

            if( err ){
                return res.status(400).json({
                    resp: false,
                    msj : 'Email already exists' ,
                    err
                });
            } // nếu lỗi 
    
            res.json({
                resp: true,
                msj: 'User ' + userdb.users + ' was created successfully',
            }) // nếu thành công 
    
        });

    });

    
};

module.exports = {
    createUsers
};