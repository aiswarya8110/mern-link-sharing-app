import { createContext } from 'react';
import useLocalStorage from '../custom-hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children })=>{
    const [ loggedIn, setLoggedIn ] = useLocalStorage("loggedIn", false);

    const updateLoggedIn = ()=>{
        setLoggedIn((prev)=> !prev);
    }

    return (
        <AuthContext.Provider value={{loggedIn, updateLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}