import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style.css';
import axios from 'axios'
import {useUser} from './Context'
import { useQuery } from './Context';

export const renderMarkdown = (text) => {
    if (!text) return '';

    // Escape HTML tags first
    text = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Code blocks (```)
    text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Images
    text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '<img id="insertedImg" src="$2" alt="$1" class="img-fluid rounded">');

    // YouTube Embed (matching YouTube links)
    text = text.replace(/\[youtube\]\((https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))\)/g,
        '<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/$2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>');

    // Links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Line
    text = text.replace(/^\s*-{2,}\s*$/gm, '<hr>');

    //Spacing
    text = text.replace(/ {2,}/g, match => '&nbsp;'.repeat(match.length));

    // Unordered list
    text = text.replace(/^-\s?(.*)$/gm, '<ul><li>$1</li></ul>');
    text = text.replace(/<\/ul>\n<ul>/g, ''); 

    // Ordered list
    text = text.replace(/^@\s?(.*)$/gm, '<ol><li>$1</li></ol>');
    text = text.replace(/<\/ol>\n<ol>/g, ''); 

    // Heading5
    text = text.replace(/^#{5}\s?(.*)$/gm, '<h5>$1</h5>');
    // Heading4
    text = text.replace(/^#{4}\s?(.*)$/gm, '<h4>$1</h4>');
    // Heading3
    text = text.replace(/^#{3}\s?(.*)$/gm, '<h3>$1</h3>');
    // Heading2
    text = text.replace(/^#{2}\s?(.*)$/gm, '<h2>$1</h2>');
    // Heading1
    text = text.replace(/^#{1}\s?(.*)$/gm, '<h1>$1</h1>');
    
    // Bold and Italic
    text = text.replace(/\*\*\*(.*?)\*\*\*/g, '<em><strong>$1</strong></em>');
        
    // Bold
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Converting single line breaks into <br/>
    text = text.replace(/\n/g, '<br/>')
    
    // Wraping content in paragraph
    text = '<p>' + text + '</p>';
    
    return text;
}

const NoteArea = () => {
    const [content, setContent] = useState('')
    const [preview, setPreview] = useState('')
    const [isPreview, setIsPreview] = useState(false)
    const {noteName} = useParams()
    const {user} = useUser()
    const {query} = useQuery()

    const userEmail = user?.email || sessionStorage.getItem('email');
    
    useEffect(() => {
        const saveAndUpdateNote = async () => {
            await axios.post(`http://localhost:5000/api/createNote/${noteName}`, {content: content, email: userEmail}, {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
        }
        const timeoutId = setTimeout(saveAndUpdateNote, 500);

        return () => clearTimeout(timeoutId);
    }, [content, noteName, userEmail]);

    useEffect(() => {
        setPreview(renderMarkdown(content));
    }, [content]);

    useEffect(() => {
        setContent(query);
    }, [query, noteName]);


    return (
        <div>
            <div className='d-flex mb-1'>
                <button id='btnEdit' type='button' className={`btn w-100 p-1 ${!isPreview ? 'btn-secondary' : 'btn-dark'}`} onClick={() => setIsPreview(false)}>Edit</button>
                <button id='btnPreview' type='button' className={`btn w-100 p-1 ${isPreview ? 'btn-secondary' : 'btn-dark'}`} onClick={() => setIsPreview(true)}>Preview</button>
            </div>
            {!isPreview ? (
                <textarea
                className='note-area p-4 border rounded-lg bg-white shadow-sm w-100'
                value={content}
                onChange={(e) => {
                    setContent(e.target.value)
                }}
                placeholder='Write down your notes here'
            />):(
                <div
                    className='note-area p-4 border rounded-lg bg-white shadow-sm w-100'
                    dangerouslySetInnerHTML={{ __html: preview }}
                />
            )}
        </div>
    );
};

export default NoteArea;
