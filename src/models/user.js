'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Phương thức hỗ trợ định nghĩa các mối quan hệ (associations).
         * Phương thức này sẽ được gọi tự động từ file `models/index`.
         */
        static associate(models) {
            // định nghĩa mối quan hệ giữa các bảng ở đây (ví dụ: một User có nhiều Post)
        }
    };

    User.init({
        // Định nghĩa các trường dữ liệu (columns) của bảng User
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        address: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        gender: DataTypes.BOOLEAN, // true: Nam, false: Nữ
        image: DataTypes.STRING,
        roleId: DataTypes.STRING,
        positionId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User', // Tên model
    });

    return User;
};