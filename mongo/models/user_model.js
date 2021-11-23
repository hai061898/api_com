const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
// giống như gọi tạo bẳng = schema

const usersSchema = new Schema({
    users: {
        type: String,
        required: [true, 'Users is required']
    },
    email: {
        type: String, // kiểu
        unique: true, // độc nhất
        required: [true, 'Email is required'] // nếu nó trống xuất ra yêu cầu này
    },
    passwordd: {
        type: String,
        required: [true, 'Password is required']
    },
    token: {
        type: String,
        required: false
    },
    statuss: {
        type: Boolean,
        default: true
    },
    person_id: {
        type: Schema.Types.ObjectId, // kiểu objectId
        ref : 'person' // tham chiếu đến table person 
    },
    created: {
        type: String,
        required: false
    }

});
// tạo cách trường dữ liệu 

usersSchema.plugin( uniqueValidator, { message: '{PATH} It already exists' });
// nếu nó Nó đã tồn tại thì xuất ra lỗi 
module.exports = mongoose.model('users', usersSchema);
//gọi tên table này 