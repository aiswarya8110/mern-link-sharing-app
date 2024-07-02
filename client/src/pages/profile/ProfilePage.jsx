import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import PreviewScreen from '../../components/preview-screen/PreviewScreen'
import { useDispatch, useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import { DefaultUploadImage } from '../../utils/images'
import UploadImage from '../../svgs/UploadImage';
import { isValidImage } from '../../utils/functions'
import { useData } from '../../custom-hooks/useData';
import { useForm } from 'react-hook-form';
import SuccessToast from '../../components/success-toast/SuccessToast'
import Footer from '../../components/footer/Footer'
import { getProfile, updateProfileInfo } from '../../redux/features/profileSlice'
const ProfileDetailsFooter = ()=>{
  const { success } = useSelector((store)=> store.profile);
  return (
    <footer className='flex gap-5 justify-between mt-6 w-full text-base font-semibold leading-6 max-md:flex-wrap max-md:pr-5 max-md:max-w-full border-t border-t-gray-300'>
      {success && <SuccessToast />}
      <hr className='shrink-0 h-px' />
      <Footer />
    </footer>
  )
}


const ProfileFieldSection = ({ profileImage})=>{
  const { register, handleSubmit, reset, formState: {errors} } = useForm();
  const { errorMsg, profileInfo } = useSelector((store)=> store.profile);
  const { updateProfileData } = useData();
  const dispatch = useDispatch();

  useEffect(()=>{
    reset({
      first_name: profileInfo?.first_name || '',
      last_name: profileInfo?.last_name || '',
      email: profileInfo?.email || ''
    })
  },[profileInfo?._id])

  const submitForm = (data)=>{
    const payload = 
    {...data, 
    ...(profileImage && { profileImage })} // If image present then upload image
      
    updateProfileData(payload);
    dispatch(updateProfileInfo(payload));
  }

  return (
    <form
      id="profile-form"
      onSubmit={handleSubmit(submitForm)}
      className='flex flex-col justify-center p-5 mt-6 mb-3 text-base leading-6 rounded-xl bg-neutral-50 max-md:max-w-full'
    >
      {errorMsg && <p className='error-msg'>{errorMsg}</p>}
      <div className='flex gap-4 mt-3 max-md:flex-wrap items-center'>
        <div className='grow w-[40%] text-neutral-500'>First name*</div>
        <div
          className={`profile-input flex gap-3 items-center px-4 py-3 mt-1 bg-white rounded-lg border ${
            errors.first_name && 'border-red-500'
          } border-solid`}
        >
          <input
            type='text'
            placeholder='Mike'
            className='profile-input'
            {...register('first_name', {
              required: "Can't be empty",
            })}
          />
          <span className='flex-auto self-stretch my-auto text-xs text-right text-red-500'>
            {errors.first_name?.message}
          </span>
        </div>
      </div>
      <div className='flex gap-4 mt-3 max-md:flex-wrap items-center'>
        <div className='grow w-[40%] text-neutral-500'>Last name*</div>
        <div
          className={`profile-input flex gap-3 items-center px-4 py-3 mt-1 bg-white rounded-lg border ${
            errors.last_name && 'border-red-500'
          } border-solid`}
        >
          <input
            type='text'
            placeholder='Jackson'
            className='profile-input'
            {...register('last_name', {
              required: "Can't be empty",
            })}
          />
          <span className='flex-auto self-stretch my-auto text-xs text-right text-red-500'>
            {errors.last_name?.message}
          </span>
        </div>
      </div>
      <div className='flex gap-4 mt-3 max-md:flex-wrap  items-center'>
        <div className='grow w-[40%] text-neutral-500'>Email*</div>
        <div
          className={`profile-input flex gap-3 items-center px-4 py-3 mt-1 bg-white rounded-lg border ${
            errors.email && 'border-red-500'
          } border-solid`}
        >
          <input
            type='email'
            placeholder='e.g. email@example.com'
            className='profile-input'
            {...register('email', {
              required: "Can't be empty",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/g,
                message: 'Invalid email address',
              },
            })}
          />
          <span className='flex-auto self-stretch my-auto text-xs text-right text-red-500'>
            {errors.email?.message}
          </span>
        </div>
      </div>
    </form>
  )
}

const ProfileDetailsHeader = ()=>{
  return (
    <header>
      <h1 className='text-3xl font-bold leading-10 text-zinc-800 max-md:max-w-full'>
        Profile Details
      </h1>
      <p className='mt-2 text-base leading-6 text-neutral-500 max-md:max-w-full'>
        Add your details to create a personal touch to your profile.
      </p>
    </header>
  )
}

const SelectedProfileImage = ({ selectedImage })=>{
    return (
      <>
        {selectedImage ? (
          <>
            <img
            src={selectedImage}
            alt='User image' 
            className='shrink-0 max-w-full rounded-xl  w-[193px] h-[193px] max-md:mt-6 object-cover transition duration-300 ease-in-out opacity-100 group-hover:opacity-60'/>

            <div className='absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-col bg-gradient-to-b from-black to-transparent max-sm:w-[193px] max-sm:h-[193px]'>
              <UploadImage />
              <span className='text-white text-lg font-bold'>Change Image</span>
            </div>
          </>
           ) : 
        
        <div className='flex flex-col justify-center items-center px-5 text-base font-semibold leading-6 text-purple bg-violet-100 rounded-xl h-[193px] w-[193px]'>
          <img src={DefaultUploadImage} 
          alt="Default image" 
          className='self-center w-10 aspect-square'/>
          <div className='mt-2'>
            + Upload Image
          </div>
        </div>}
      </>
    )
}


const Profile = () => {
  const { profileInfo, isLoading } = useSelector((store)=> store.profile);
  const [profileImage, setProfileImage ] = useState(null);
  const [ activeIndex ] = useState(1);
  const { updateProfileImage } = useData();
  const fileRef = useRef();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProfile());

    return ()=> updateProfileImage(null);
  },[])

  const handleFileChange = async(e)=>{
    const file = e.target.files[0];
    const message = await isValidImage(file);

    if(message === ''){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = ()=>{
        const imageData = reader.result;
        setProfileImage(imageData);
        updateProfileImage(imageData);
      }
    }
    else alert(message);
  }

  return (
    <div className='flex flex-col pt-6 bg-neutral-50'>
    <Header activeIndex={activeIndex}/>
    <main className='px-6 pb-6 mt-6 w-full max-md:px-5 max-md:max-w-full'>
      <div className='flex gap-5 max-md:flex-col max-md:gap-0'>
        <PreviewScreen />
        <section className='flex flex-col ml-5 w-[100%] xl:w-[59%] max-xl:ml-0'>
          <div className='flex flex-col grow items-start self-stretch pb-4 w-full bg-white rounded-xl max-md:mt-6 max-md:max-w-full'>
            <div className='flex flex-col self-stretch px-10 pt-10 pb-20 max-md:px-5 max-md:max-w-full'>
              <ProfileDetailsHeader />
              <section className='flex flex-col justify-center p-5 mt-10 rounded-xl bg-neutral-50 max-md:max-w-full'>
                <div className='max-md:max-w-full'>
                  <div className='flex gap-5 max-md:flex-col max-md:gap-0'>
                    <div className='flex flex-col w-[36%]'>
                      <p className='self-stretch my-auto text-base leading-6 text-neutral-500'>
                        Profile picture
                      </p>
                    </div>
                    <div className='flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full'>
                      <div className='grow max-md:mt-4 max-md:max-w-full my-0 lg:w-[100%]'>
                        <div className='flex gap-5 max-md:flex-col max-md:gap-0'>
                          <div
                            className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'
                            onClick={() => fileRef.current.click()}
                          >
                            <div className='relative group cursor-pointer'>
                              {
                                isLoading ? <Skeleton width='193px' height='193px' className='mt-3'/> : (
                                  <SelectedProfileImage selectedImage={profileImage || profileInfo?.profileImage}/>
                                )
                              }
                            </div>
                          </div>
                          <div className='flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full'>
                            <p className='self-stretch my-auto text-xs leading-5 text-neutral-500 max-md:mt-10'>
                              {profileImage
                                ? 'Image Uploaded'
                                : 'Image must be below 1024x1024px. Use PNG or JPG format.'}
                            </p>
                          </div>
                          <input
                            type='file'
                            accept='image/png,image/jpeg,image/jpg'
                            className='hidden'
                            ref={fileRef}
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <ProfileFieldSection
                profileInfo={profileInfo}
                profileImage={profileImage}
              />
            </div>
            <div className='shrink-0 h-px bg-zinc-300 max-md:max-w-full' />
            <ProfileDetailsFooter />
          </div>
        </section>
      </div>
    </main>
  </div>
  )
}

export default Profile