import axios from "axios"
import { useUser } from "./Context"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "./Context"

const Home = () => {
    const navigate = useNavigate()
    const {setQuery} = useQuery()
    const {user, setUser} = useUser()
    const [notes, setNotes] = useState([])

    const userEmail = user?.email || sessionStorage.getItem('email');
    const userName = user?.name || sessionStorage.getItem('name');

    useEffect(() => {
        if (!user && sessionStorage.getItem('email')) {
            setUser({
                email: sessionStorage.getItem('email'),
                name: sessionStorage.getItem('name')
            });
        }
    }, [user, setUser])

    async function getContent(noteName) {
        const response = await axios.post('http://localhost:5000/api/query', {query: noteName, email: userEmail}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if(response.status === 200){
            setQuery(response.data.content)
        }
    }

    useEffect(() => {
        const getNotes = async () => {
            const response = await axios.post('http://localhost:5000/api/getAllNotes', {email: userEmail}, {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
            );
            setNotes(response.data)
        }
        getNotes()
    }, [userEmail, navigate]) 

    return(
        <div className="col-md-9 p-3">
            <div className="mb-4">
                <p className="text-muted mb-2">Start writing down your biggest ideas</p>
                <h3>{userName.split(' ')[0]}'s home</h3>
            </div>
            <br/>
            <p className="text-muted">Keep your notes updated</p>
            <div className="d-flex w-100" style={{ height: '50%' }}>
                {notes.length === 0 ? (
                    <div className="d-flex w-100 justify-content-center align-items-center">
                            No notes created yet
                    </div>
                ):(
                    <div className="homeNoteArea d-flex w-100 p-3" id="homeNotes" style={{backgroundColor: 'white'}}>
                        {[...notes].reverse().map((note, index) => (
                                <button key={index}
                                    className="btn btn-sm btn-warning ms-2"
                                    id="btnHome"
                                    style={{maxWidth: '20%', minWidth: '20%', textAlign: 'center'}}
                                    onClick={() => {
                                        getContent(note)
                                        navigate(`/createNote/${note}`)
                                    }}
                                >{note}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home