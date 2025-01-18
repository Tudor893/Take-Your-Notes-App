import { useUser } from "./Context"
import { useState, useEffect } from "react"
import axios from "axios"
import moment from 'moment'
import { useNavigate } from "react-router-dom"
import { useQuery } from "./Context"

const SeeYourNotes = () => {
    const [notes, setNotes] = useState([])
    const {user} = useUser()
    const [isLoading, setIsLoading] = useState(false)
    const [fetchLoading, setFetchLoading] = useState(false)
    const [isDescending, setIsDescending] = useState(false)
    const [isChronological, setIsChronological] = useState(true)
    const navigate = useNavigate()
    const {setQuery} = useQuery()

    const userEmail = user?.email || sessionStorage.getItem('email')

    useEffect(() => {
        const getNotesInfo = async() => {
            setIsLoading(true)
            const response = await axios.post('http://localhost:5000/api/getNotesInfo', {email: userEmail}, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            if(response.status === 200){
                setNotes(response.data);
                setIsLoading(false)
            }
        }
        getNotesInfo()
    }, [userEmail])

    async function goToNote(noteName){
        const searchNote = noteName
        setFetchLoading(true)
        const response = await axios.post('http://localhost:5000/api/query', {
            query: searchNote, 
            email: userEmail
        }, {
            headers:{
                'Content-Type': 'application/json'
            }
        });

        if(response.status === 200){
            const {noteName, content} = response.data
            setQuery(content);
            setFetchLoading(false)
            navigate(`/createNote/${noteName}`)
        }
    }
    
    const sortNotesByName = () => {
        const sortedNotes = [...notes].sort((a, b) => {
            if (isDescending) {
                return b.noteName.localeCompare(a.noteName)
            } else {
                return a.noteName.localeCompare(b.noteName)
            }
        })
        setNotes(sortedNotes)
    }

    const sortNotesByDate = () => {
        const sortedNotes = [...notes].sort((a, b) => {
            const dateA = new Date(a.updatedAt).getTime()
            const dateB = new Date(b.updatedAt).getTime()

            if (isChronological) {
                return dateB - dateA
            } else {
                return dateA - dateB
            }
        })
        setNotes(sortedNotes)
    }

    return (
        <div className="col-md-9 p-4">
            <div>
                <h3>Your notes</h3>
            </div>
            {!isLoading? (
            <div className="mt-4">
                <p className="text-muted">{notes.length} notes</p>
            </div>
            ) : (<div className="mt-4">Loading...</div>)}
            <div className="d-flex p-2">
                <div className="fw-bold" style={{width: '48%'}}>Title
                    <button type="button" className="btn btn-dark btn-sm ms-2"
                        onClick={() => {
                            setIsDescending(!isDescending)
                            sortNotesByName()
                        }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">
                                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                            </svg>
                      </button>
                </div>
                <div className="fw-bold" style={{width: '28%'}}>Created by</div>
                <div className="fw-bold" style={{width: '24%'}}>Updated At
                    <button type="button" className="btn btn-dark btn-sm ms-2"
                        onClick={() => {
                            setIsChronological(!isChronological)
                            sortNotesByDate()
                        }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
                                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                            </svg>
                      </button>
                </div>
            </div>
            {!isLoading? (
            <div className="scrollbar d-flex w-100 h-75 flex-column" style={{ gap: '0.5rem' }}>
                {notes.map((note, index) => (
                    <button key={index}
                        type="button"
                        className="btn btn-light"
                        onClick={() => goToNote(note.noteName)}>
                            <div className="d-flex" style={{textAlign: 'start'}}>
                                <div className="text-truncate" style={{width: '46%'}}>{note.noteName}</div>
                                <div className="text-truncate" style={{width: '30%'}}>{note.email}</div>
                                <div className="text-truncate" style={{width: '24%'}}>{moment(note.updatedAt).format('DD/MM/YYYY HH:mm')}</div>
                            </div>
                    </button>
                ))}
            </div>) : (<div className="d-flex w-100 h-50 justify-content-center align-items-center">Loading...</div>)}
                {fetchLoading && (
                    <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 1050 }}>
                        <div className="alert alert-primary">Loading...</div>
                    </div>
                )}
        </div>
    )
}

export default SeeYourNotes