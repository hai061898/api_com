const multer = require('multer');
const path = require('path');
// dùng để upload ảnh vào thư mục uploads 
var storage = multer.diskStorage({
    destination: ( req, res, cb ) => {
        cb(null, 'src/uploads/Profile')
    },
    //chỗ nhận file (đường đãn chứa file)
    filename: ( req, file, cb ) => {
        cb( null, file.fieldname + '-' + Date.now() + path.extname(file.originalname) )
    }
    //tên file đầy đủ 
});


const uploadsProfile = multer({ storage: storage });
//gọi storage (công đoạn cuối để file chứa vào storage)


module.exports = {
    uploadsProfile
}