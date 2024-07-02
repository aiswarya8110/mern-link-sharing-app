import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginLogo, SmallLoginLogo, EyePreviewIcon } from '../../utils/images';
import LinkImage from '../../svgs/LinkImage';
import ProfileDetailsImage from '../../svgs/ProfileDetailsImage';
import { GREY_COLOR, PURPLE_COLOR } from '../../utils/constants';
const Header = ({ activeIndex })=>{
    const navigate = useNavigate();
    return (
        <header className='flex flex-col justify-center self-center px-5 py-4 w-full text-base leading-6 bg-white rounded-xl max-w-[1392px] max-md:max-w-full'>
            <div className='flex items-center justify-between gap-5 w-full max-md:flex-wrap max-md:max-w-full'>
                <Link to='/'>
                    <img src={LoginLogo} loading='lazy' alt='logo' className='shrink-0 max-w-full aspect-[4.55] w-[146px] hidden md:block'/>

                    <img src={SmallLoginLogo} alt='logo' className='shrink-0 aspect-[4.55] block md:hidden'/>
                </Link>
                <nav className='flex items-center gap-4 cursor-pointer'>
                    <div className={`flex items-center gap-2 px-7 py-3 max-md:px-5 rounded-lg text-neutral-500 ${activeIndex === 0 && 'bg-neutral-100 text-purple font-semibold'}`}
                    onClick={()=> navigate('/dashboard')}
                    >
                        {
                            activeIndex === 0 ? (
                                <LinkImage fill={PURPLE_COLOR}/>
                            ):
                            (
                                <LinkImage fill={GREY_COLOR}/>
                            )
                        }
                        <div className='hidden md:flex font-semibold'>
                            Links
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 px-7 py-3 max-md:px-5 rounded-lg text-neutral-500 ${activeIndex === 1 && 'bg-neutral-100 text-purple font-semibold'}`}
                    onClick={()=> navigate('/profile')}
                    >
                    {
                            activeIndex === 1 ? (
                                <ProfileDetailsImage fill={PURPLE_COLOR}/>
                            ):
                            (
                                <ProfileDetailsImage fill={GREY_COLOR}/>
                            )
                        }
                        
                        <div className='hidden md:flex font-semibold'
                        >
                            Profile
                        </div>
                    </div>
                </nav>
                <Link to='preview' className={`hidden md:flex justify-center px-7 py-4 whitespace-nowrap text-purple rounded-lg border border-solid border-purple hover:bg-purple-light`}>
                    Preview
                </Link>
                <Link to='preview' className='flex md:hidden justify-center px-7 py-4 text-purple whitespace-nowrap rounded-lg border border-purple border-solid max-md:px-5'>
                    <img src={EyePreviewIcon} alt='preview'/>
                </Link>
            </div>
        </header>
    )
}

export default Header;