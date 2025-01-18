import { GoogleLogin} from '@react-oauth/google'
import { useNavigate } from 'react-router-dom';
import { useUser } from './Context'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import { useState } from 'react';


const LoginButton = () => {
    const {setUser} = useUser()
    const navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false)

    return (
        <div className="d-flex justify-content-center">
            <GoogleLogin 
                    onSuccess={async (credentialResponse) => {
                        const token = jwtDecode(credentialResponse.credential)
                        const userData = {
                            email: token.email,
                            name: token.name,
                            picture: token.picture
                        }
                        //console.log(userData.email);
                        await axios.post('http://localhost:5000/api/addEmailToDB', {email: userData.email, name: userData.name}, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        setUser(userData);
                        sessionStorage.setItem('email', userData.email)
                        sessionStorage.setItem('name', userData.name)
                        sessionStorage.setItem('picture', userData.picture)
                        navigate('/')
                }}
                onError={() => {
                    setShowAlert(true)
                    setTimeout(() => setShowAlert(false), 2000)
                }}
            />
                {showAlert && (
                    <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 1050 }}>
                        <div className="alert alert-danger">Login failed</div>
                    </div>)}
        </div>
    )
}

export default LoginButton