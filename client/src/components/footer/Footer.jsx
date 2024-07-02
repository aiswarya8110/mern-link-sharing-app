import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const Footer = ({ handleSubmit })=>{
    const { isRequestSent: isLinksRequestSent } = useSelector((store)=> store.links.isRequestSent);
    const { isRequestSent: isProfileRequestSent } = useSelector((store)=> store.profile.isRequestSent);
    const { updateLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async()=>{
        updateLoggedIn();
        navigate('/');
    }
    return (
        <div className='ml-auto'>
            <button 
            className='border-none bg-white font-semibold hover:underline mr-6'
            onClick={handleLogout}
            >
                Logout
            </button>
            <button
            className={`px-7 py-4 mr-10 bg-purple text-white font-semibold leading-6 whitespace-nowrap rounded-md cursor-pointer text-base max-md:mr-2.5 max-md:px-5 ${isLinksRequestSent && 'opacity-25 cursor-not-allowed'}`}
            type="submit"
            form="profile-form"
            onClick={()=>{
                if(handleSubmit){
                    handleSubmit();
                }
            }}
            >
                {isLinksRequestSent || isProfileRequestSent ? 'Saving...' : 'Save'}
            </button>
        </div>
    )
}

export default Footer;