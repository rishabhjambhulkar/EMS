import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold'>Employee Management System</h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li>Home</li>
          </Link>
            <li>Booking</li>
          </Link>
          <Link to='/guess'>
          {currentUser && (
            <>
              <Link to='/dashboard'>
                <li>Dashboard</li>
              </Link>
              <Link to='/employee'>
                <li>Employee Data</li>
              </Link>
            </>
          )}
        
          <Link to='/profile'>
            
              <li> Sign In</li>
           
          </Link>
        </ul>
      </div>
    </div>
  );
}
