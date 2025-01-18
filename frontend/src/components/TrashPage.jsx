import axios from "axios"
import { useEffect, useState } from "react"
import { useUser } from "./Context"


const TrashPage = () => {
    const [notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const {user} = useUser()
    const [showAlert, setShowAlert] = useState(false)

    const userEmail = user?.email || sessionStorage.getItem('email');

    const getNotes = async () =>{
        setIsLoading(true)
        const response =  await axios.post('http://localhost:5000/api/getAllNotes', {email: userEmail}, {
        headers:{
            'Content-Type': 'application/json'
        }
    })
        setNotes(response.data)
        setIsLoading(false)
    }

    const deleteNote = async (noteName) => {
        const response =  await axios.post('http://localhost:5000/api/deleteNote', {noteName: noteName, email: userEmail}, {
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if(response.status === 200){
            setNotes(notes.filter(note => note !== noteName));
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        }
    }

    useEffect(() => {
        getNotes()
    }, [userEmail])

    return(
        <div className="col-md-9 p-5">
            <div className="d-flex justify-content-center mb-5">
                <h2>Trash Page</h2>
            </div>
            <div className="scrollbar d-flex row">
                {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center">
                        Loading...
                    </div>
                ) : notes.length > 0 ? [...notes].reverse().map(note => (
                    <div key={note} className="card w-100 mb-2">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            {note}
                            <button type="button" 
                                    className="btn btn-danger"
                                    onClick={() => {deleteNote(note)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                                </button>
                        </div>
                    </div>
                )):
                    (<div className="d-flex justify-content-center align-items-center">
                        No notes to delete
                    </div>)}

            </div>
                {showAlert && (
                        <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 1050 }}>
                            <div className="alert alert-success">Note deleted successfully!</div>
                        </div>
                )}
        </div>
    )
}

export default TrashPage