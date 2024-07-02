import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginLogo, EmailIcon, PasswordIcon } from '../../utils/images'
import { BASE_API_URL } from '../../utils/constants';
const Register = () => {
  const { register, reset, handleSubmit, formState: { errors }, watch } = useForm();
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ successMessage, setSuccessMessage ] = useState('');
  const navigate = useNavigate();
  console.log(errors);

  const onSubmit = async(data)=>{
    try{
      setErrorMessage(null);
      await axios.post(`${BASE_API_URL}/auth/register`,
      {
        email: data.email,
        password: data.password
      });
      reset();
      setSuccessMessage('Registered sucessfully!!');
      setTimeout(()=>{
          navigate('/');
      }, 2000)
    }
    catch(error){
      const { data } = error.response
      setErrorMessage(data);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center md:bg-neutral-50 leading-[150%] md:p-20 max-md:px-5'>
      <img src={LoginLogo} alt="login" className='mt-4 w-[182px] max-w-full aspect-[4.55]'/>
      <div className='flex flex-col justify-center w-[476px] max-w-full mt-12 bg-white rounded-lg max-md:mt-10'>
        <div className='flex flex-col md:p-10'>
          <h1 className='text-3xl font-bold text-zinc-800'>Create account</h1>
          <p className='mt-2 text-base text-neutral-500'>Let 's get you started sharing your links</p>
          <form className='flex flex-col gap-4 mt-8' onSubmit={handleSubmit(onSubmit)}>
            {errorMessage && <p className='error-msg'>{errorMessage}</p>}
            {successMessage && <p className='text-green-500'>{successMessage}</p>}
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
                    pattern:{
                      value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/g,
                      message: "Invalid email address"
                    }
                  })}
                  />
                  {errors?.email?.message && (
                    <span 
                    className='text-right text-red-500 flex-auto text-xs'
                    >
                    {errors.email.message}
                    </span>
                  )}
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
                    {...register("password", {
                      required: "Can't be empty",
                      maxLength: {
                        value: 8,
                        message: "Must have at least 8 characters"
                      }
                    })}
                    />
                    {errors?.password?.message && (
                      <span className='flex-auto text-xs text-right text-red-500'>{errors?.password?.message}</span>
                    )}
                  </div>
                </div>
                <div>
                  <label 
                  className={`text-xs mt-10 text-zinc-800`} 
                  htmlFor="cpassword"
                  >
                    Confirm password
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
                    id='cpassword'
                    placeholder='confirm password'
                    className='flex-auto text-base focus:outline-none'
                    {...register("cpassword", {
                        required: "Can't be empty",
                        validate: (value)=>{
                          if(value !== watch("password")){
                            return "Passwords do not match"
                          }
                        }                      
                    })}
                    />
                    {errors?.cpassword?.message && (
                      <span className='flex-auto text-xs text-right text-red-500'>{errors?.cpassword?.message}</span>
                    )}
                  </div>
                  <p className='mt-2 text-xs text-neutral-500'>
                    Password must contain at least 8 characters
                  </p>
                </div>
                <button
                  type='submit'
                  className='justify-center items-center px-16 py-4 mt-2 text-base font-semibold text-white bg-purple rounded-lg max-md:px-5'
                >
                  Create new account
                </button>
                <p className='mt-6 text-center text-base max-sm:flex max-sm:flex-col'>
                  <span className='text-neutral-500'>
                    Already have an account? 
                  </span>
                  <Link to="/login" className='text-purple-600'>Login</Link>
                </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register