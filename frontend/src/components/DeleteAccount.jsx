import { googleLogout } from "@react-oauth/google"
import { useUser } from "./Context"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const DeleteAccount = () => {
    const {user, setUser} = useUser()
    const navigate = useNavigate()

    const userEmail = user?.email || sessionStorage.getItem('email');

    return(
        <div>
            <div id="cardProfileDelete" style={{height: '50%', width: '40%', position:'absolute', left:'50%', top:'40%', transform:'translate(-50%, -50%)'}}>
                <div className="card shadow">
                    <div className="card-body">
                        <h3 className="d-flex justify-content-center align-items-center p-4" style={{width: '100%',color: "purple", fontSize: '2rem'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle" viewBox="0 0 16 16" style={{ width: '2rem', height: '2rem' }}>
                                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                            </svg>
                            Warning: Account Deletion</h3>
                    <div className='d-flex justify-content-center p-2'>
                        <p style={{textAlign: "center"}}> After you delete your account, all your data, including personal information, settings, 
                            and saved content, will be permanently removed and cannot be recovered.
                            Please ensure that you have backed up any important information before proceeding.</p>
                        <br/>
                    </div>
                    <div className="d-flex justify-content-center p-2">
                        <button type="button" className="btn btn-danger"
                         onClick={async () => {
                            const response = await axios.post('http://localhost:5000/api/deleteAccount', {email: userEmail}, {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            if(response.status === 200){
                                googleLogout()
                                setUser(null)
                                sessionStorage.removeItem('email')
                                sessionStorage.removeItem('name')
                                sessionStorage.removeItem('picture')
                                navigate('/login', { replace: true })
                            }
                         }}>
                            Delete account
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount