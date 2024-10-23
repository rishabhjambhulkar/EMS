import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Connect Verse </h1>
        </Link>
        <ul className='flex gap-4'>
        {currentUser &&(  
          <Link to='/'>
            <li>Home</li>
          </Link>
 )}
         {currentUser &&(  
          
          <Link to='/verification'>
            <li>Verify</li>
          </Link>
        
        )}
         
          <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
