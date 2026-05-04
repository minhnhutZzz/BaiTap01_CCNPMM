import express from "express"; // gọi Express
import homeController from "../controllers/homeController"; // gọi controller

let router = express.Router(); // khởi tạo Route

let initWebRoutes = (app) => {
    // cách 1: Viết trực tiếp hàm xử lý tại route (thường dùng để test nhanh)
    router.get('/', (req, res) => {
        return res.send('Đào Minh Nhựt'); // Đã đổi tên thành Đào Minh Nhựt
    });

    // cách 2: gọi hàm đã định nghĩa trong controller (Cách làm chuyên nghiệp)
    router.get('/home', homeController.getHomePage); // url cho trang chủ
    router.get('/about', homeController.getAboutPage); // url cho trang about
    router.get('/crud', homeController.getCRUD); // url get crud
    router.post('/post-crud', homeController.postCRUD); // url post crud
    router.get('/get-crud', homeController.getFindAllCrud); // url lấy findAll
    router.get('/edit-crud', homeController.getEditCRUD); // url get editcrud
    router.post('/put-crud', homeController.putCRUD); // url put crud
    router.get('/delete-crud', homeController.deleteCRUD); // url get delete crud

    return app.use("/", router); // url mặc định bắt đầu bằng dấu gạch chéo
}

module.exports = initWebRoutes;