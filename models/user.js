import Sequelize from 'sequelize';
import sequelize from "../utils/db.js"

const User = sequelize.define('user', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    CNIC: Sequelize.STRING,
    education: Sequelize.STRING,
    phone: Sequelize.STRING,
    country: Sequelize.STRING,
    city: Sequelize.STRING,
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
});



export default User;
