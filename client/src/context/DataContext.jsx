import { createContext, useState } from 'react';

export const DataContext = createContext();

const DataContextProvider = ({ children })=>{
    const [ profileImage, setProfileImage ] = useState(null);
    const [ profileData, setProfileData ] = useState(null);

    const updateProfileData = (profileData)=>{
        setProfileData(profileData);
    }

    const updateProfileImage = (image)=>{
        setProfileImage(image);
    }

    return (
        <DataContext.Provider value={{updateProfileImage, profileImage, updateProfileData, profileData}}>
            {children}
        </DataContext.Provider>
    )
};

export default DataContextProvider;