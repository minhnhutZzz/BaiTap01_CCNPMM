import bcrypt from 'bcryptjs'; // import thư viện bcryptjs để mã hóa mật khẩu
import db from '../models/index'; // import database từ models

const salt = bcrypt.genSaltSync(10); // thuật toán hash password

/**
 * Hàm tạo người dùng mới (Create)
 * @param {Object} data dữ liệu người dùng từ form
 */
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Mã hóa mật khẩu người dùng gửi lên
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);

            // Lưu người dùng vào bảng User trong Database
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            });

            resolve('OK create a new user successfull');
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Hàm mã hóa mật khẩu bằng bcrypt
 * @param {string} password mật khẩu thuần
 */
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt); // truyền biến password vào để hash
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Hàm lấy tất cả người dùng từ Database (Read)
 */
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true, // Chỉ lấy dữ liệu gốc
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Hàm lấy thông tin chi tiết một người dùng theo ID
 * @param {number} userId ID của người dùng cần tìm
 */
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }, // truy vấn điều kiện cho tham số
                raw: true
            });

            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Hàm cập nhật thông tin người dùng (Update)
 * @param {Object} data dữ liệu người dùng cần cập nhật
 */
let updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id } // tìm người dùng theo id
            });

            if (user) {
                user.firstName = data.firstName; // gán giá trị mới
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save(); // lưu thay đổi

                let allusers = await db.User.findAll(); // lấy lại danh sách mới
                resolve(allusers);
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Hàm xóa người dùng theo ID (Delete)
 * @param {number} userId ID của người dùng cần xóa
 */
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            });

            if (user) {
                await user.destroy(); // thực hiện lệnh xóa
            }

            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

// Xuất các hàm ra bên ngoài để Controller có thể sử dụng
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUser: updateUser,
    deleteUserById: deleteUserById
};