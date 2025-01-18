import NoteArea from "./NoteArea.jsx"
import { useUser } from "./Context.jsx";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CreateNote = () => {
    const {noteName} = useParams()
    const {user} = useUser()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTimeSetterOpen, setTimeSetterOpen] = useState(false);
    const [isMinutes, setIsMinutes] = useState(true)
    const [time, setTime] = useState()
    const [showCopied, setShowCopied] = useState(false);

    const userEmail = user?.email || sessionStorage.getItem('email');

    const generateShareableLink = () => {
        let expiryTime;
        if(isMinutes)
            expiryTime = Date.now() + time * 60 * 1000;
        else
            expiryTime = Date.now() + time * 3600 * 1000;
        const accessToken = btoa(`${expiryTime}`);
        return `${window.location.origin}/view/${noteName}/${encodeURIComponent(userEmail)}/${accessToken}`;
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(generateShareableLink());
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    }

    const closeTimeSetter = () => {
        if (time) {
            setTimeSetterOpen(false);
            handleCopyLink();
            setTime()
        }
    }

    return (
        <div className="col-md-9 p-2">
            <div className="p-1 col-12">
                <div>
                    <div className='d-flex mb-1'>
                        <button type="button" className="btn btn-info w-100" onClick={() => setIsModalOpen(true)}>
                            Markdown documentation
                        </button>

                        <button 
                            className="btn btn-sm btn-outline-primary w-25 ms-1"
                            onClick={() => setTimeSetterOpen(true)}
                        >
                            Generate link
                        </button>

                        {isTimeSetterOpen && (
                            <div className='card shadow' style={{
                                position: "absolute",
                                top:'50%',
                                left:'50%',
                                transform:'translate(-50%, -50%)',
                                width:'40%',
                                height:'50%',
                                backgroundColor:'darkgreen'
                            }}  id="timeSetter">
                                <div className='card-body'>
                                    <div className='d-flex p-1'>
                                            <h5 className="mt-2 text-truncate" style={{color: 'white'}}>Set timer for link</h5>
                                            <button 
                                                type="button" 
                                                className="btn btn-light ms-auto d-flex" 
                                                onClick={() => { setTime(); setTimeSetterOpen(false); setIsMinutes(true) }}
                                            >
                                                <span>&times;</span>
                                            </button>
                                    </div>
                                    <div className="d-flex mt-5">
                                        <button 
                                            type="button" 
                                            className={`btn w-50 me-1 ${isMinutes ? 'btn-secondary' : 'btn-light'}`}
                                            onClick={() => setIsMinutes(true)}
                                        >
                                            Minutes
                                        </button>
                                        <button 
                                            type="button" 
                                            className={`btn w-50 ms-1 ${!isMinutes ? 'btn-secondary' : 'btn-light'}`}
                                            onClick={() => setIsMinutes(false)}
                                        >
                                            Hours
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <input 
                                            className="form-control w-50" 
                                            type="number" 
                                            style={{backgroundColor: 'lightgreen'}} 
                                            placeholder="Enter the number of min/h"
                                            onChange={(e) => setTime(e.target.value)}
                                        />
                                        
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button 
                                            type="button" 
                                            className={`btn w-25 btn-light mt-2`}
                                            onClick={closeTimeSetter}>
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {showCopied && (
                            <div className="position-fixed top-0 start-50 translate-middle-x p-3" style={{ zIndex: 1050 }}>
                                <div className="alert alert-success">Link copied!</div>
                            </div>
                        )}

                        {isModalOpen && (
                            <div id="documentationCard" className='card shadow' style={{
                                position: "absolute",
                                top:'50%',
                                left:'50%',
                                transform:'translate(-50%, -50%)',
                                width:'40%',
                                height:'50%',
                                backgroundColor: 'navajowhite'
                            }}>
                                <div className='card-body'>
                                    <div className='d-flex p-1'>
                                            <h5 className="d-flex mt-2 text-truncate justify-content-center w-100">Markdown</h5>
                                            <button type="button" className="btn btn-dark ms-auto d-flex" onClick={() => setIsModalOpen(false)}>
                                                <span>&times;</span>
                                            </button>
                                    </div>
                                    <textarea className='scrollbar'
                                        id='documentation'
                                        value={"Heading 1-5\n\tUse # for h1\n\tUse ## for h2\n\tUse ### for h3\n\tUse #### for h4\n\tUse ##### for h5\nBold\n\tUse **text** for bold\nItalic\n\tUse *text* for italic\nBold and Italic\n\tUse ***text*** for bold and italic\nUnordered list\n\tUse -text for unordered list\nOrdered list\n\tUse @text for ordered list\nLine\n\tUse at least 2 '-' to insert a line(example: --)\nLink\n\tUse [link_name](url) to insert a link\nImage\n\tUse ![alt_text](image_url) to insert an image\nYoutube video\n\tUse [youtube](video_url) to insert a youtube video\nBlock of code\n\tUse ```code``` to insert a block of code"}
                                        disabled
                                        style={{backgroundColor: 'navajowhite', color: 'black'}}
                                    />
                                </div>
                            </div>
                        )}
                        </div>
                            <div>
                                <NoteArea />
                            </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNote;