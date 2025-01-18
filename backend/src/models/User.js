import Sequelize from 'sequelize'
import db from '../dbConfig.js'

const User = db.define("User", {
    Email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Date: {
        type: Sequelize.DATE,
        allowNull: false
    }},
    {
        timestamps: false
    }
)

export default User