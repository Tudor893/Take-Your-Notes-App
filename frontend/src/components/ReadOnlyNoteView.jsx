import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { renderMarkdown } from './NoteArea';

const ReadOnlyNoteView = () => {
    const [content, setContent] = useState('')
    const [preview, setPreview] = useState('')
    const { noteName, email, accessToken } = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        const checkAccess = () => {
            const expiryTime = Number(atob(accessToken));
            if (Date.now() > expiryTime) {
                navigate('/access-expired');
                return false;
            }
            return true;
        };

        const fetchContent = async () => {
            if (!checkAccess()) return;
            try {
                const response = await axios.post(`http://localhost:5000/api/view/${noteName}/${email}/${accessToken}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data && response.data.content !== content) {
                    setContent(response.data.content);
                    setPreview(renderMarkdown(response.data.content));
                }
            } catch (error) {
                console.error('Error fetching note:', error);
                if (error.response?.status === 403) 
                    navigate('/access-expired');
            }
        };
        fetchContent();

        const intervalId = setInterval(fetchContent, 500);

        return () => clearInterval(intervalId);
    }, [noteName, email, content]);

    return (
        <div className="p-1 col-12">
            <div className='d-flex justify-content-center w-100 mb-1' style={{height: '10vh'}}>
                <button type='button' className='btn btn-primary' onClick={() => navigate('/login')}>
                    Start writing down your biggest ideas. Click to Log in
                </button>
            </div>
            <div className="note-area p-4 border rounded-lg bg-white shadow-sm w-100"
                 dangerouslySetInnerHTML={{ __html: preview }} />
        </div>
    );
};

export default ReadOnlyNoteView;