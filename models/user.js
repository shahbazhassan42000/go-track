import Sequelize from 'sequelize';
import sequelize from "../utils/db.js"

const UserSchema = sequelize.define('user', {
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

export default UserSchema;
