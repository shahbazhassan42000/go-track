import Sequelize from 'sequelize';
import sequelize from "../utils/db.js"

const Application = sequelize.define('application', {
    userId: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    name: Sequelize.STRING,
    fatherName: Sequelize.STRING,
    relationship: Sequelize.STRING,
    fatherCNIC: Sequelize.STRING,
    fatherPhone: Sequelize.STRING,
    CNIC: Sequelize.STRING,
    education: Sequelize.STRING,
    phone: Sequelize.STRING,
    province: Sequelize.STRING,
    DOB: Sequelize.DATE,
    address: Sequelize.STRING,
    email: Sequelize.STRING,
    status: {
        type: Sequelize.STRING,
        defaultValue: "Pending"
    }
});



export default Application;
