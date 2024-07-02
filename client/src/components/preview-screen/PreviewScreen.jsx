import React, { useEffect } from 'react';
import PhoneInnerImage from '../phone-inner-image/PhoneInnerImage';
import PreviewLinks from '../preview-links/PreviewLinks';
import { useDispatch, useSelector } from 'react-redux';
import { getLinks } from '../../redux/features/linksSlice';
import { getProfile } from '../../redux/features/profileSlice';
const PreviewScreen = ()=>{
    const dispatch = useDispatch();
    const { links } = useSelector((store)=> store.links);
    const { profileInfo } = useSelector((store)=> store.profile);
    useEffect(()=>{
        dispatch(getProfile());
        dispatch(getLinks());
    },[])
    return (
        <section className='hidden xl:flex flex-col w-[41%]'>
            <div className='flex relative grow justify-center items-center self-stretch px-16 py-20 w-full bg-white rounded-xl max-md:px-5 max-md:mt-6 max-md:max-w-full'>
                <div className='flex relative flex-col justify-center mt-6 max-w-full aspect-[0.49] w-[307px] border-[1px] border-neutral-500 rounded-[40px] p-2'>
                    <div className='absolute -z-1'>
                        <PhoneInnerImage />
                    </div>
                    <div className='absolute z-0 inset-0 flex items-center justify-center'>
                        <PreviewLinks links={links} profileInfo={profileInfo}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PreviewScreen;