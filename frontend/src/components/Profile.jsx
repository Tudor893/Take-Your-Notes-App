import { useNavigate } from "react-router-dom"
import { useUser } from "./Context"
import { useState, useEffect } from "react"
import axios from "axios"

const Profile = () => {
    const {user} = useUser()
    const navigate = useNavigate()
    const [notes, setNotes] = useState(0)

    const userEmail = user?.email || sessionStorage.getItem('email')
    const userName = user?.name || sessionStorage.getItem('name')
    const userPicture = user?.picture || sessionStorage.getItem('picture')

    useEffect(() => {
        const getNotesInfo = async() => {
            const response = await axios.post('http://localhost:5000/api/getNotesInfo', {email: userEmail}, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            if(response.status === 200){
                setNotes(response.data)
            }
        }
        getNotesInfo()
    }, [])

    return (
        <div>
            <div id="cardProfileDelete" style={{height: '60%', width: '40%', position:'absolute', left:'50%', top:'40%', transform:'translate(-50%, -50%)'}}>
                <div className="card shadow">
                    <div className="card-body d-flex justify-content-center align-items-center p-2 flex-column">
                            <img className="rounded-circle" style={{width: '20%', height: '20%'}} src={userPicture} alt="Profile picture"/>
                            <h4 className="mt-4">Name</h4>
                            <p>{userName}</p>
                            <h4>Email</h4>
                            <p>{userEmail}</p>
                            <h4>Notes created:</h4>
                            <p>{notes.length}</p>
                            <button type="button" className="btn btn-danger"
                                onClick={() => {
                                navigate('/deleteAccount')
                                }}>
                            Delete account</button>
                    </div>                
                </div>
            </div>
        </div>
    )
}

export default Profile