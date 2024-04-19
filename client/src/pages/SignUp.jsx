import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import axios from 'axios';
import "./SignUp.css";
import { useDispatch } from "react-redux";
// import { setToast } from "../redux/user/AuthReducer.js";


export default function SignUp() {


  // console.log(isNameValid)
  
  const [inputs, setInputs] = useState({
    email: null,
    name: null,
    password: null,
    isEmailValid: null,
    isNameValid: null,
    isPasswordValid: null,
  });
  
  const {
    email,
    name,
    password,
    isEmailValid,
    isNameValid,
    isPasswordValid,
  } = inputs;

  const handleChanges = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "name") {
      
      setInputs((prev) => ({ ...prev,isNameValid: e.target.value !=="" }));
    }
    
    if (e.target.name === "email") {
      console.log(true)
      setInputs((prev) => ({
        ...prev,
        isEmailValid: /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+/.test(
          e.target.value
        ),
      }));
    }
    if (e.target.name === "password") {
      setInputs((prev) => ({
        ...prev,
        isPasswordValid:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
            e.target.value
          ),
      }));
    }
    if (e.target.name === "mobile") {
      setInputs((prev) => ({
        ...prev,
        isMobileValid: /^[0-9]{10}$/.test(e.target.value),
      }));
    }
  };
  
  

  // const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email verification request data:",inputs.name);
    try {
      setLoading(true);
      setError(false);
      const response = await axios.post('/api/auth/signup', JSON.stringify({username:name, email: email, password:password}), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
  
    

      const verificationResponse = await axios.post("/api/auth/sendmail", JSON.stringify({ email }) , {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      // Handle response from email verification
      console.log("Email verification response:", verificationResponse.data);
  
      setLoading(false);
      if (response.data.success === false || verificationResponse.data.success === false) {
        setError(true);
        return;
      }
      navigate('/verification');
    } catch (error) {
      setLoading(false);
      setError(true);
      // Check if the error has a response
      if (error.response) {
        // The request was made and the server responded with a status code
        // Extract the error message from the response data
        const errorMessage = error.response.data.message;
        console.error('Error message:', errorMessage);
        // Handle error message as needed
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  
  // if (isNameValid) {
  //   // Code to execute if isNameValid is true
  //   console.log("isNameValid is true");
  // } else {
  //   // Code to execute if isNameValid is false
  //   console.log("isNameValid is false");
  // }
  // const inputStyles = {
  //   border: isNameValid !== null && isNameValid ? '2px solid green' : '2px solid red',
  //   borderRadius: '4px',
  //   padding: '5px',
  //   width: '200px',
  // };
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
     
      <input
        type="text"
        value={name}
        name="name"
        onChange={handleChanges}
        style={{
          border: isNameValid !== null ? (isNameValid ? "1px solid green" : "1px solid red") : "1px solid gray",
        }}
      />


        <input
          type="email"
          style={{
            border: isEmailValid !== null ? (isEmailValid ? "1px solid green" : "1px solid red") : "1px solid gray",
          }}
          value={email}
          name="email"
          onChange={handleChanges}
          placeholder="Email Address*"
        />
        <input
          type="password"
          style={{
            border: isPasswordValid !== null ? (isPasswordValid ? "1px solid green" : "1px solid red") : "1px solid gray",
          }}
          name="password"
          value={password}
          onChange={handleChanges}
          placeholder="Create Password*"
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  );
}
