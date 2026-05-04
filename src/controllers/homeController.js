import db from '../models/index'; // import database
import CRUDService from '../services/CRUDService'; // import service

// Hàm hiển thị trang chủ và test kết nối database
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); // lấy dữ liệu từ models/index
        return res.render('homepage.ejs', {
            data: JSON.stringify(data) // trả dữ liệu data về view
        });
    } catch (e) {
        console.log(e);
    }
}

// Hàm hiển thị trang About
let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

// Hàm hiển thị form nhập liệu CRUD
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

// Hàm xử lý tạo mới người dùng (POST)
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body); // gọi service
    console.log(message);
    return res.redirect('/get-crud'); // Chuyển hướng về trang danh sách
}

// Hàm lấy tất cả dữ liệu để hiển thị (Read)
let getFindAllCrud = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('users/findAllUser.ejs', {
        datalist: data // gọi view và truyền dữ liệu ra view
    });
}

// Hàm lấy dữ liệu để chuẩn bị Edit
let getEditCRUD = async (req, res) => {
    let userId = req.query.id; // lấy id từ link ?id=
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        return res.render('users/updateUser.ejs', {
            data: userData
        });
    } else {
        return res.send('Không lấy được id');
    }
}

// Hàm xử lý cập nhật dữ liệu (Update)
let putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data); // update rồi hiển thị lại danh sách
    return res.render('users/findAllUser.ejs', {
        datalist: data1
    });
}

// Hàm xử lý xóa dữ liệu (Delete)
let deleteCRUD = async (req, res) => {
    let id = req.query.id; // lấy id trên view ?id=
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.redirect('/get-crud'); // Chuyển hướng về trang danh sách
    } else {
        return res.send('Not find user');
    }
}

// Xuất tất cả các hàm ra object để sử dụng bên route
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCrud: getFindAllCrud,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}