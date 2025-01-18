import LoginPage from './LoginPage'
import { Routes, Route } from 'react-router-dom'
import DisplayContentApp from './DisplayContentApp';
import ProtectedRoute from './ProtectedRoute';
import { ContextProvider } from './Context';
import DeleteAccount from './DeleteAccount';
import Profile from './Profile';
import ReadOnlyNoteView from './ReadOnlyNoteView';
import AccessExpired from './AccessExpired';
import Guest from './Guest';

function App() {

    return (
        <div>
            <ContextProvider>
                <Routes>
                    <Route path='/login' element={<LoginPage/>} />
                    <Route path='/view/:noteName/:email/:accessToken' element={<ReadOnlyNoteView/>} />
                    <Route path="/access-expired" element={<AccessExpired />} />
                    <Route path="/guest" element={<Guest />} />
                    <Route path='/profile' element={
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>} />
                    <Route path='/deleteAccount' element={
                        <ProtectedRoute>
                            <DeleteAccount/>
                        </ProtectedRoute>
                        } />
                    <Route path='*' element={
                        <ProtectedRoute>
                                <DisplayContentApp/>
                        </ProtectedRoute>
                        } />
                </Routes>
            </ContextProvider>
        </div>
    )
}
export default App;
