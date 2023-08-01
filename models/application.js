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
    father_name: Sequelize.STRING,
    father_CNIC: Sequelize.STRING,
    CNIC: Sequelize.STRING,
    DOB: Sequelize.DATE,
    phone: Sequelize.STRING,
    city: Sequelize.STRING,
    email: Sequelize.STRING,
    last_exam: Sequelize.STRING,
    passing_year: Sequelize.INTEGER,
    board: Sequelize.STRING,
    total_marks: Sequelize.INTEGER,
    roll_no: Sequelize.STRING,
    institute: Sequelize.STRING,
    stud_pic: Sequelize.STRING,
    CNIC_DOC: Sequelize.STRING,
    result_DOC: Sequelize.STRING,
    status: {
        type: Sequelize.STRING,
        defaultValue: "Received"
    }
});



export default Application;
