import { Sequelize } from "sequelize";
import db from "../dbConfig.js";

const Note = db.define("Note", {
    Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    NoteName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    NoteContent: {
        type: Sequelize.TEXT,
        allowNull: true
    }},{
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['NoteName', 'Email']
            }
        ]
    }
)

export default Note