import express from "express"; // Nạp thư viện express
import bodyParser from "body-parser"; // Hỗ trợ lấy tham số từ client (ví dụ: /user?id=7)
import viewEngine from "./config/viewEngine"; // Nạp cấu hình viewEngine đã tạo
import initWebRoutes from './route/web'; // Nạp file định tuyến (route)
import connectDB from './config/connectDB'; // Nạp hàm kết nối database
require('dotenv').config(); // Gọi hàm config của dotenv để dùng được process.env.PORT

let app = express();

// Cấu hình app để đọc được dữ liệu gửi lên
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app); // Chạy cấu hình view engine
initWebRoutes(app); // Chạy cấu hình các đường link (route)

connectDB(); // Thực hiện kết nối tới cơ sở dữ liệu MySQL

// Thiết lập cổng chạy server, lấy từ file .env, nếu không có thì mặc định là 6969
let port = process.env.PORT || 6969;

app.listen(port, () => {
    // Callback thông báo khi server chạy thành công
    console.log("Backend Nodejs is running on the port : " + port);
});