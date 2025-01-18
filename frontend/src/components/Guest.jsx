import NoteArea from "./NoteArea"
import { useState } from "react";

const Guest = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <div className="mt-4">
            <div className='d-flex mb-1'>
                    <button type="button" className="btn btn-info w-100" onClick={() => setIsModalOpen(true)}>
                            Markdown documentation
                        </button>
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
            <NoteArea/>
        </div>
    )
}

export default Guest