import Note from "../models/Note.js";

async function createNote(noteName, email, content) {
    return Note.create({ NoteName: noteName, Email: email, NoteContent: content })
}

async function getNote(noteName, email){
    return await Note.findOne({where: {NoteName: noteName, Email: email}})
}

async function updateNote(noteName, email, content){
    await Note.update({NoteContent: content}, {where: {NoteName: noteName, Email: email}})
}

async function getAllNotes(email){
    return await Note.findAll({where: {Email: email}})
}

async function deleteNote(noteName, email) {
    let note = await Note.findOne({where: {NoteName: noteName, Email: email}})
    return await note.destroy()
}

async function deleteAllNotes(email) {
    let notes = await Note.findAll({where: {Email: email}})
    return Promise.all(notes.map(note => note.destroy()))
}

async function getContent(noteName, email) {
    let note = await Note.findOne({where: {NoteName: noteName, Email: email}})
    return note.NoteContent
}

export {createNote, updateNote, getNote, getAllNotes, deleteNote, deleteAllNotes, getContent}