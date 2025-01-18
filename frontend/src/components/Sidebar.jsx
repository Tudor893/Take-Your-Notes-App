import {useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useUser, useQuery } from './Context';
import '../style.css';
import { googleLogout } from '@react-oauth/google';
import axios from 'axios'

const Sidebar = () => {
    const navigate = useNavigate();
    const {user, setUser} = useUser()
    const {setQuery} = useQuery()
    const [createNote, setCreateNote] = useState(false)
    const [inputCreateNote, setInputCreateNote] = useState("")
    const [showAlert, setShowAlert] = useState(false)

    const userEmail = user?.email || sessionStorage.getItem('email');
    const userPicture = user?.picture || sessionStorage.getItem('picture');

    useEffect(() => {
        if (!user && sessionStorage.getItem('email')) {
            setUser({
                email: sessionStorage.getItem('email'),
                picture: sessionStorage.getItem('picture')
            });
        }
    }, [user, setUser]);



    const handleCreateNewNote = async () => {
        if (!inputCreateNote) {
            alert('Please enter a note name');
            return;
        }
        const input = inputCreateNote;
        const response = await axios.post(`http://localhost:5000/api/createNote/${input}`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            
        if(response.status === 200) {
            setCreateNote(false);
            setInputCreateNote("")  
            setQuery('')
            navigate(`/createNote/${input}`);
        }
    };

    const navButtons = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
            ),
            text: "Home",
            path: "/",
            className: "mt-5"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-plus" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"/>
                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
                </svg>
            ),
            text: "Create Note",
            path: "/createNote",
            className: "mt-3"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-tags" viewBox="0 0 16 16">
                    <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"/>
                    <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z"/>
                </svg>
            ),
            text: "See your notes",
            path: "/seeYourNotes",
            className: "mt-3"
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            ),
            text: "Trash",
            path: "/trash",
            className: "mt-3"
        },
        {
            text: "Logout",
            className: "mt-3"
        }
    ];

    async function search(e) {
        e.preventDefault();
        const searchNote = e.target.query.value;
        try{
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
                navigate(`/createNote/${noteName}`)
            }
        }catch(err){
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 2000)
        }
    }

    
    return (  
        <div className="col-md-3">
            {createNote ? (
                <div id='boxCreateNote' className='card shadow' style={{
                    position: "absolute",
                    top:'50%',
                    left:'50%',
                    transform:'translate(-50%, -50%)',
                    width:'30%',
                    height:'30%',
                    backgroundColor:'#24272e',
                    zIndex: 1000 
                }}>
                    <div className='card-body d-flex flex-column align-items-center justify-content-center mt-2'>
                        <label className='d-flex p-2 w-100 mb-1' style={{color: 'white', justifyContent: 'center'}}>Note name</label>
                        <input className='d-flex w-75' placeholder='Type here' onChange={(e) => setInputCreateNote(e.target.value)} onKeyPress={(e) => {
                            if(e.key === 'Enter'){
                                handleCreateNewNote()
                            }
                        }}></input>
                        <div className="mt-2">
                            <button type='button' className='btn btn-success me-2' onClick={handleCreateNewNote}>Create</button>
                            <button type='button' className='btn btn-danger' onClick={() => {
                                setCreateNote(false);
                                setInputCreateNote("");
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
            ):(null)}
            <div className="sidebar-container p-2">
                <div className="card shadow">
                    <div className="card-body">
                        {userEmail &&
                            <button type="button" className="btn mb-4 w-100 text-truncate" onClick={() => navigate('/profile')}>
                                {userPicture && <img src={userPicture} alt='Profile' className='rounded-circle me-1' style={{width:'8vh', height: '8vh'}}/>}
                                {userEmail}
                            </button>
                        }
                        <form className="d-flex" onSubmit={search}>
                            <div className="input-group">
                                <span className="input-group-text border-0 bg-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                    </svg>
                                </span>
                                <input className="form-control" type="search" placeholder="Search" name="query"/>
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </div>
                        </form>
                            
                        <div className='scrollbar'>
                            {navButtons.map((button) => (
                                <div key={button.text}>
                                    <button type='button' className={`btn btn-dark w-100 ${button.className}`}
                                        onClick={() =>{
                                            if(button.text === "Logout"){
                                                googleLogout()
                                                setUser(null)
                                                sessionStorage.removeItem('email')
                                                sessionStorage.removeItem('name')
                                                sessionStorage.removeItem('picture')
                                                setQuery('')
                                                navigate('/login', { replace: true })
                                            }else
                                            if(button.text === 'Create Note'){
                                                setCreateNote(true)
                                            }else{
                                                navigate(button.path)
                                            }}}>
                                        <span className='me-2'>{button.icon}</span>
                                        {button.text}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
                {showAlert && (
                    <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 1050 }}>
                        <div className="alert alert-danger">Your note name doesn't match any existent note</div>
                    </div>
                )}
        </div>
    );
};

export default Sidebar