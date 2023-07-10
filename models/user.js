import Sequelize from 'sequelize';
import sequelize from "../utils/db.js"

const User = sequelize.define('user', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    CNIC: Sequelize.STRING,
    education: Sequelize.STRING,
    phone: Sequelize.STRING,
    country: Sequelize.STRING,
    province: Sequelize.STRING,
    image: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: Sequelize.STRING,
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: "Active"
    }
});



export default User;
