import { createContext, useContext, useState } from "react";

export const Context = createContext(null)

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [query, setQuery] = useState('')

    return (
        <Context.Provider value={{user, setUser, query, setQuery}}>
            {children}
        </Context.Provider>
    )
}

export const useUser = () => { const {user, setUser} = useContext(Context); return {user, setUser}}
export const useQuery = () => { const {query, setQuery} = useContext(Context); return {query, setQuery}}