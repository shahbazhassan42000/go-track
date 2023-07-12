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

// Define a hook function that runs after the model is synchronized with the database
const addDefaultAdmin = async (options) => {
    // Check if there is any user with the role of 'admin' in the table
    const adminCount = await User.count({ where: { role: 'ADMIN' } });
    // If not, create one with some default values
    if (adminCount === 0) {
        await User.create({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: 'ADMIN',
            status: 'Active'
        });
    }
};

// Add the hook function to the user model
User.afterSync(addDefaultAdmin);

export default User;
