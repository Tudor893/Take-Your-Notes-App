import Note from "./Note.js";
import User from "./User.js";
import env from 'dotenv'
import mysql from 'mysql2/promise.js'
import db from '../dbConfig.js'

env.config()

async function create_DB(){
    let conn
    conn = await mysql.createConnection({
        user: process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD
    })
        await conn.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
        await conn.end()
}

function FK_Config(){
    User.hasMany(Note, {as: 'Notes', foreignKey: 'Email'})
    Note.belongsTo(User, {foreignKey: 'Email'})
}

async function DB_Init(){
    await create_DB()

    await db.authenticate()
    console.log('Connected to database!')

    FK_Config()

    await db.sync({ force: false })
    console.log('Tables synchronized successfully!')
}

export default DB_Init