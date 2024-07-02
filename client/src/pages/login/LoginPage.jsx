import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LoginLogo, EmailIcon, PasswordIcon } from '../../utils/images';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { BASE_API_URL } from '../../utils/constants';
import useAuth from '../../custom-hooks/useAuth';
const Login = () => {
  const [ errorMsg, setErrorMsg ] = useState('');
  const { register, reset, handleSubmit, formState: { errors }} = useForm();
  const { updateLoggedIn } = useAuth();
  const navigate = useNavigate();
  const submitData = async(data)=>{
        try{
          const response = await  axios.post(`${BASE_API_URL}/auth/login`, 
          {
            email: data.email,
            password: data.password
          })

          updateLoggedIn();
          navigate('/');

        }catch(error){
          console.log(error)
        }
  }

  return (
    <div className='flex flex-col justify-center items-center md:p-20 text-base leading-6 md:bg-neutral-50 text-zinc-800'>
      <img 
      loading='lazy'
      src={LoginLogo} 
      className='mt-32 max-w-full aspect-[4.55] w-[182px] max-md:mt-10' 
      alt='logo'
      />
      <div className='flex flex-col justify-center mt-12 max-w-full bg-white rounded-xl w-[476px] max-md:mt-10'>
        <div className='flex flex-col p-10 max-md:px-5 max-md:max-w-full'>
            <div className='text-3xl font-bold'>Login</div>
            <div className='mt-2 text-neutral-500'>
              Add your details below to get back into the app
            </div>
            <form className='flex flex-col gap-4 mt-8' onSubmit={handleSubmit(submitData)}>
                {errorMsg && <p className='error-msg'>{errorMsg}</p>}
                <div>
                  <label className={`mt-10 text-xs text-zinc-800`}>
                    Email address
                  </label>
                  <div className={`flex gap-3 items-center px-4 py-3 mt-1 bg-white rounded-lg border ${''} border-solid`}>
                  <img 
                  src={EmailIcon} 
                  alt="email" 
                  className='shrink-0 grow-0 w-4 aspect-square'/>
                  <input 
                  type='text' 
                  className='flex-auto text-base focus:outline-none' 
                  placeholder="ex: alex@example.com"
                  {...register("email", {
                    required: "Can't be empty",
                    pattern: {
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/g,
                      message: "Invalid email"
                    }
                  })}
                  />
                  {
                  errors?.email?.message && (
                  <span className='text-right text-red-500 flex-auto text-xs'>
                    {errors.email.message}
                  </span>
                    )
                  }
                </div>
                </div>
                <div>
                  <label 
                  className={`text-xs mt-10 text-zinc-800`} 
                  htmlFor="password"
                  >
                    Password
                  </label>
                  <div className={`flex gap-3 items-center mt-1 rounded-lg px-4 py-3 bg-white border border-solid`}
                  >
                    <img 
                    src={PasswordIcon} 
                    alt='' 
                    className='shrink-0 grow-0 aspect-square w-4'
                    />
                    <input
                    type='password'
                    id='password'
                    placeholder='Enter you password'
                    className='flex-auto text-base focus:outline-none'
                    {...register("password",{
                      required: "Can't be empty",
                    })} 
                    />
                    {errors?.password?.message && (
                      <span className='flex-auto text-xs text-right text-red-500'>
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
                <button type="submit" className='justify-center text-center items-center px-16 py-4 mt-3 font-semibold text-white whitespace-nowrap bg-purple rounded-lg max-md:px-5'>
                  Login
                </button>
                <div className='mt-6 text-center max-sm:flex max-sm:flex-col'>
                  <span className='text-neutral-500'>Don't have an account? </span>
                  <span className='text-purple-600'>
                    <Link to='/register'>Create account</Link>
                  </span>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login