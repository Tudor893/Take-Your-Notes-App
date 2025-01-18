import User from "../models/User.js";

async function createUser(email, name, date) {
    return User.create({ Email: email, Name: name, Date: date });
}

async function getUserByEmail(email){
    return await User.findByPk(email)
}

async function deleteUser(email) {
    let user = await User.findOne({where: {Email: email}})
    return await user.destroy()
}

export {createUser, getUserByEmail, deleteUser}