import Sequelize from 'sequelize';
import sequelize from '../utils/db.js';

const NewsletterSchema = sequelize.define('newsletter', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true}
    },
    subscribed: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}, {timestamps: false});

sequelize.sync().then(() => {
    console.log('newsletter table created successfully!');
}).catch((error) => {
    console.error('Unable to create newsletters table : ', error);
});

export default NewsletterSchema;