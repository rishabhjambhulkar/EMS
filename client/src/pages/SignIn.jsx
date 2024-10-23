import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';
import React from 'react'; 
import axios from 'axios';
import axiosInstance from './axiosInstance'
import PasswordInput from '../components/password';

export default function SignIn({ setIsAuthenticated }) {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

 

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(signInStart());
  
  //     const res = await axios.post('http://localhost:4000/api/auth/signin', formData, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     const data = res.data;
  
  //     if (data.success === false) {
  //       dispatch(signInFailure(data));
  //       return;
  //     }
  
  //     setIsAuthenticated(true);
  //     dispatch(signInSuccess(data));
  //     navigate('/');
  //   } catch (error) {
  //     dispatch(signInFailure(error));
  //   }
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
  
    try {
      // Start the sign-in process in Redux
      dispatch(signInStart());
  
      // Use axiosInstance instead of axios
      const res = await axiosInstance.post('/auth/signin', formData);
  
      const data = res.data;

      console.log(data)
      const { accessToken, refreshToken, user } = res.data;

      if (!accessToken || !refreshToken) {
        dispatch(signInFailure({ message: 'Failed to obtain tokens' }));
        return;
      }
  
      // Store tokens in local storage or any secure place
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
  
      // Handle failed sign-in attempts
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
  
      // Mark user as authenticated and dispatch success
      setIsAuthenticated(true);
      dispatch(signInSuccess(user));
  
      // Navigate to home after successful sign-in
      navigate('/');
    } catch (error) {
      // Dispatch sign-in failure action if error occurs
      dispatch(signInFailure(error));
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        {/* <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        /> */}
         <PasswordInput
          value={formData.password || ''}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
    </div>
  );
}
