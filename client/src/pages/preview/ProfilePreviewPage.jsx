import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector, useDispatch } from 'react-redux';
import { getLinks } from '../../redux/features/linksSlice';
import { getProfile } from '../../redux/features/profileSlice';
import PreviewLinks from '../../components/preview-links/PreviewLinks';
import { toast } from 'react-toastify';
const ProfilePreview = () => {
  const { profileInfo, errorMsg } = useSelector((store)=> store.profile);
  const { links } = useSelector((store)=> store.links);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getLinks());
    dispatch(getProfile());
  },[])

  return (
    <div className='flex flex-col leading-[150%] relative'>
      <div className='flex flex-col px-6 pt-6 pb-32 w-full text-base font-semibold md:bg-purple rounded-bl-[40px] rounded-br-[40px] max-md:px-5 max-md:max-w-full'>
        <div className='flex flex-col justify-center md:px-6 py-4 max-md:mb-32 md:mb-44 md:bg-white sm:bg-none rounded-xl md:pl-5 max-md:max-w-full'>
          <div className='flex gap-5 justify-between items-center max-md:flex-wrap max-md:max-w-full'>
            <Link to="/" className='justify-center px-7 py-4 text-purple rounded-lg border border-purple border-solid max-md:px-5 hover:bg-purple-light'>
               Back to Editor
            </Link>

            
              <CopyToClipboard text={`${window.location.origin}/${profileInfo?.email.split('@')[0]}`}
              onCopy={()=> toast("Copied to clipboard")}
              >
                <div className='justify-center px-7 py-4 text-white bg-purple rounded-lg max-md:px-5 cursor-pointer'>
                    Share Link
                </div>
              </CopyToClipboard>
          </div>
        </div>
      </div>
      <div className='flex z-10 flex-col self-center px-14 py-8 mt-0 max-w-full md:bg-white md:rounded-3xl md:shadow-lg w-[375px] h-[600px] max-md:px-5 relative -top-40'>
        {errorMsg && <p className='error-msg'>{errorMsg}</p>}
        <PreviewLinks profileInfo={profileInfo} links={links}/>
      </div>
    </div>
  )
}

export default ProfilePreview