import bgImage from '../images/bgLogIn.png';
import { useEffect } from "react";
import LoginButton from "./LoginButton";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        document.body.style.backgroundImage = `url(${bgImage})`;
        document.body.style.backgroundSize = 'cover';
    
        return () => {
            document.body.style.backgroundImage = ``;
        };
    }, []);

    return (
        <div>
            <div id="loginCard" style={{width: '30%', position:'absolute', left:'50%', top:'40%', transform:'translate(-50%, -50%)'}}>
                <div className="card shadow">
                    <div className="card-body">
                        <h2 className="d-flex justify-content-center p-4" style={{fontSize: "3.6vw", color: "purple"}}>TakeYourNotes</h2>
                    <div className='d-flex justify-content-center p-2 mt-3'>
                        <LoginButton/>
                    </div>
                    <div className='d-flex justify-content-center p-2'>
                        Or
                    </div>
                    <div className='d-flex justify-content-center p-2'>
                        <button type='button' className='btn btn-dark' onClick={() => navigate('/guest')}>
                            Try as a guest
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <footer style={{position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)'}} className="">
                <p className="mt-5"><b>© 2024 TakeYourNote Corporation. All rights reserved.</b></p>
            </footer>
        </div>    
    )
}

export default LoginPage