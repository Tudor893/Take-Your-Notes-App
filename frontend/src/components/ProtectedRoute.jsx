import { Navigate } from "react-router-dom";
import { useUser } from "./Context";

const ProtectedRoute = ({children}) => {
    const {user} = useUser()

    if(!user && !sessionStorage.getItem('email'))
        return <Navigate to={'/login'} replace/>
        
    return children
}

export default ProtectedRoute