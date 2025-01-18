import express, { urlencoded } from 'express'
import env from 'dotenv'
import cors from 'cors'
import moment from 'moment'
import { createUser, getUserByEmail, deleteUser } from './dataAccess/UserDA.js'
import DB_Init from './models/DB_Init.js'
import { createNote, updateNote, getNote, getAllNotes, deleteNote, deleteAllNotes, getContent } from './dataAccess/NoteDA.js'

env.config()
let port = process.env.PORT

let app = express()

app.use(express.json())
app.use(urlencoded({
    extended: true
}))
app.use(cors())

DB_Init()

app.post('/api/createNote/:name', async (req, res) => {
    const noteName = req.params.name
    const { content, email } = req.body
    if(email && content){
        let note = await getNote(noteName, email)
        if(!note){
            note = await createNote(noteName, email, content)
        }
        else{
           await updateNote(noteName, email, content)
        }
    }
    return res.status(200).json({message: "success"})
})

app.post('/api/addEmailToDB', async (req, res) => {
    const {email, name} = req.body
    const date = moment().format("MM/DD/YYYY")
    let user = await getUserByEmail(email)
    if (!user) {
        user = await createUser(email, name, date)
    }
    return res.status(200).json({message: 'email added to db'})
})

app.post('/api/query', async (req, res) => {
    const {query, email} = req.body
    const note = await getNote(query, email)
    if(note)
        res.status(200).json({noteName: note.NoteName, content: note.NoteContent})
    else
        res.status(400).json({message: 'error'})
})

app.post('/api/getAllNotes', async (req, res) => {
    const {email} = req.body
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    let notes = await getAllNotes(email)
    let noteNames = notes.map(note => note.NoteName)
    res.json(noteNames)
})

app.post('/api/deleteNote', async (req, res) => {
    const {noteName, email} = req.body
    await deleteNote(noteName, email)
    res.status(200).json({message: 'success'})
})

app.post('/api/deleteAccount', async (req, res) => {
    const {email} = req.body
    await deleteAllNotes(email)
    await deleteUser(email)
    res.status(200).json({message: 'success'})
})

app.post('/api/getNotesInfo', async (req, res) => {
    const {email} = req.body
    let notes = await getAllNotes(email)
    const notesInfo = notes.map(note => ({noteName: note.NoteName, email: note.Email, updatedAt: note.updatedAt}))
    res.status(200).json(notesInfo)
})

app.post('/api/view/:noteName/:email/:accessToken', async (req, res) => {
    const {noteName,email,accessToken} = req.params
    const expiryTime = Number(atob(accessToken));
    if (Date.now() > expiryTime) {
        return res.status(403).json({ message: 'Access expired' });
    }
    let content = await getContent(noteName, email)
    res.json({content})
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
