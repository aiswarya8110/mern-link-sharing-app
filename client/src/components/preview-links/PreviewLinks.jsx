import React from 'react';
import { useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { previewLinkColors, previewLinkIcons } from '../../utils/constants';
import { FaArrowRight } from 'react-icons/fa';
import { useData } from '../../custom-hooks/useData';
const PreviewLinks = ({ links, profileInfo })=>{
    const { pathname } = useLocation();
    const { profileImage, profileData } = useData();
    const hasProfileImage = profileImage || profileInfo?.profileImage;
    const hasEmail = profileData?.email || profileInfo?.email;
    const hasName = profileData?.first_name || profileInfo?.first_name;
    const isPreviewPage = pathname === '/' || pathname === '/dashboard' || pathname === "/profile" 
    return (
        <div className={`flex flex-col items-center
        ${isPreviewPage ? 'w-[90%]' : 'w-[100%]'}
        `}>
            {
                hasProfileImage? (
                    <img alt='user' className='h-[100px] w-[100px] rounded-full object-cover border-[5px] mx-auto border-blue-600' src={hasProfileImage}/>
                ): (
                    <Skeleton
                    circle
                    height="100px"
                    width="100px"
                    />
                )
            }
            <h2 className='text-black mt-4 mb-2 text-[20px] text-center font-bold  w-[100%]'>
                {
                    !hasName ? (
                        <Skeleton width="100%" height="20px"/>
                    ): (
                        <>
                            {
                                profileData ? (
                                    <>{profileData?.first_name} {profileData?.last_name}</>
                                ):
                                (
                                    <>{profileInfo?.first_name} {profileInfo?.last_name}</>
                                )
                            }
                        </>
                    )
                }
            </h2>
            <h5 className='text-center text-neutral-500'>
                {hasEmail ? (   
                    hasEmail
                ): (
                    <Skeleton  width="100px" height="10px"/>
                )}
            </h5>
            <ul className='list-none m-0 p-0 w-[100%] h-[300px] flex items-center flex-col gap-5 mt-12 overflow-auto'>
                {
                    links?.length == 0 ? (
                        <>
                            <div className={isPreviewPage ? 'w-[90%]' : 'w-[100%]'}>
                                <Skeleton width='100%' height='40px'/>
                            </div>
                            <div className={isPreviewPage ? 'w-[90%]' : 'w-[100%]'}>
                                <Skeleton width='100%' height='40px'/>
                            </div>
                            <div className={isPreviewPage ? 'w-[90%]' : 'w-[100%]'}>
                                <Skeleton width='100%' height='40px'/>
                            </div>
                            <div className={isPreviewPage ? 'w-[90%]' : 'w-[100%]'}>
                                <Skeleton width='100%' height='40px'/>
                            </div>
                        </>
                    ):(
                       links?.map(({_id, platform, link})=>{
                            return (
                                <li key={_id} className={isPreviewPage ? 'w-[90%]' : 'w-[100%]'}>
                                    <a 
                                    href={link}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={`preview-link-item ${previewLinkColors[platform.toLowerCase()]}`}
                                    >
                                    {previewLinkIcons[platform.toLowerCase()]}
                                    <span className='text-sm'>{platform}</span>
                                    <FaArrowRight className='ml-auto'/>
                                    </a>
                                </li>
                            )
                       })
                    )
                }
            </ul>
        </div>
    )
}

export default PreviewLinks;