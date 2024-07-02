import React, { useEffect } from 'react'
import PreviewLinks from '../../components/preview-links/PreviewLinks';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicProfile } from '../../redux/features/profileSlice';
const PublicProfilePreview = () => {
  const { publicProfileInfo, errorMsg } = useSelector((store)=> store.profile);
  const { profileId } = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getPublicProfile(profileId));
  },[])

  return (
    <div className='flex flex-col leading-[150%] relative'>
      <div className='flex flex-col px-6 pt-6 pb-32 w-full text-base font-semibold bg-purple rounded-bl-[40px] rounded-br-[40px] max-md:px-5 max-md:max-w-full'></div>
      <div className='flex z-10 flex-col self-center px-14 py-12 mt-0 max-w-full bg-white rounded-3xl shadow-lg w-[375px] h-[600px] max-md:px-5 relative -top-20'>
        {errorMsg && <p className='error-msg'>{errorMsg}</p>}
        <PreviewLinks
          profileInfo={publicProfileInfo?.profile}
          links={publicProfileInfo?.links}
        />
      </div>
    </div>
  )
}

export default PublicProfilePreview