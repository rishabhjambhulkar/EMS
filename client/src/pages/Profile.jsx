import { useSelector } from 'react-redux';
import React from 'react'; 
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import axiosInstance from './axiosInstance.js'


export default function Profile({ setIsAuthenticated }) {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  console.log(currentUser._id)

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };


  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(updateUserStart());
  //     const res = await fetch(`/api/user/update/${currentUser._id}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await res.json();
  //     console.log(data);
  //     if (data.success === false) {
  //       dispatch(updateUserFailure(data));
  //       return;
  //     }
  //     dispatch(updateUserSuccess(data));
  //     setUpdateSuccess(true);
  //   } catch (error) {
  //     dispatch(updateUserFailure(error));
  //   }
  // };

  // const handleDeleteAccount = async () => {
  //   try {
  //     dispatch(deleteUserStart());
  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: 'DELETE',
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error));
  //   }
  // };

  // const handleSignOut = async (setIsAuthenticated) => {
  //   try {
  //     await fetch('/api/auth/signout');
  //     dispatch(signOut());
  //     setIsAuthenticated(false); // Update authentication state
  //     console.log(setIsAuthenticated)
  //   } catch (error) {
  //     console.log(error);
  //   }
  
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      
      // Use axiosInstance to make the request
      const res = await axiosInstance.post(`/user/update/${currentUser._id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = res.data; // Axios automatically parses the JSON response
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.response ? error.response.data : error));
    }
  };
  
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      
      // Use axiosInstance for deletion
      const res = await axiosInstance.delete(`/user/delete/${currentUser._id}`);
      
      const data = res.data; // Axios handles the response parsing
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.response ? error.response.data : error));
    }
  };
  
  const handleSignOut = async (setIsAuthenticated) => {
    try {
      await axiosInstance.post('/auth/signout'); // Use axiosInstance for sign-out
      dispatch(signOut());
      setIsAuthenticated(false); // Update authentication state
      console.log('User signed out');
    } catch (error) {
      console.log(error.response ? error.response.data : error);
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/* 
      firebase storage rules:  
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteAccount}
          className='text-red-700 cursor-pointer'
        >
          Delete Account
        </span>
        <span onClick={() => handleSignOut(setIsAuthenticated)} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully!'}
      </p>
    </div>
  );
}
