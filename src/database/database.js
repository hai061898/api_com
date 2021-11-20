const mysql = require('mysql');
const { promisify } = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'commer'
}); // biến mysql 

pool.getConnection((err,connection)=>{
    //nếu nó lỗi gì đó xuất console ra tên lỗi đó 
    if(err){
        if(err.code== 'PROTOCOL_CONNECTION_LOST') console.log('DATABASE CONNECTION WAS CLOSED');
        if( err.code === 'ER_CON_COUNT_ERROR' ) console.log('DATABASE HAS TO MANY CONNECTIONS');
        if( err.code === 'ECONNREFUSED' ) console.log('DATABASE CONNECTION WAS REFUSED');
    }
    // nếu thành công
    if( connection ) connection.release();
    console.log('DATABASE IS CONECTED');
    return;
})

pool.query = promisify( pool.query );
//thực hiện lại hoạt động trên nên cho nó hoàn thành (nghĩ nó là giữa lời hứa để hoàng thành vc thực hiện)
//link: https://tech-wiki.online/vn/node-promisify.html

module.exports = pool;