import Home from "./Home"
import CreateNote from "./CreateNote"
import SplashScreen from "./SplashScreen"
import TrashPage from './TrashPage'
import Sidebar from "./Sidebar"
import { Route, Routes } from "react-router-dom"
import SeeYourNotes from "./SeeYourNotes"

const DisplayContentApp = () => {
    return (
        <div>
            <div className="container-fluid d-flex flex-column flex-md-row">
                <Sidebar/>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/createNote/:noteName' element={<CreateNote/>} />
                    <Route path="/seeYourNotes" element={<SeeYourNotes/>} />
                    <Route path="/trash" element={<TrashPage/>} />
                </Routes>
            </div>
        </div>  
    )
}

export default SplashScreen(DisplayContentApp)