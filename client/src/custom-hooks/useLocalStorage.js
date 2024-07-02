import { useState, useEffect } from 'react'
const useLocalStorage = (key, initialValue)=>{
    const [ value, setValue ] = useState(()=>{
    try{
        const loggedIn = window.localStorage.getItem(key);
        return loggedIn ? JSON.parse(loggedIn) : initialValue;
    }catch(err){
        return initialValue;
    }
    })

    useEffect(()=>{
        window.localStorage.setItem(key, JSON.stringify(value));
    },[value]);

    return [value, setValue];   

}

export default useLocalStorage;