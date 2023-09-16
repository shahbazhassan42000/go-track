import Sequelize from 'sequelize';
import sequelize from '../utils/db.js';

const Token = sequelize.define('token', {
    token: {
        type: Sequelize.STRING,
        allowNull: false,
    },
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
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    }
}, {
    paranoid: true, // this will add a deletedAt column and hide the row after an hour
    hooks: {
        beforeCreate: (token, options) => {
            // this will set a timer to delete the token after an hour
            setTimeout(() => {
                token.destroy();
            }, 3600);
        }
    }
});

export default Token;