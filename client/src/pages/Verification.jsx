import React from 'react';
// Assuming styles.css is in the same directory as your JSX file

import { useState } from 'react';

function Verification() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [show, setShow] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const handleEmailVerification = async (e) => {
    e.preventDefault();
    // Code to send OTP to email and verify

    const res = await fetch("api/auth/sendmail", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          email
      })
  });

  const data = await res.json();
  console.log(data);
  
  if (data.status === 401 || !data) {
    console.log("error")
} else {

    setEmail("")
    console.log("Email sent")
}

  };

  // const handlePhoneVerification = async () => {
  //   // Code to send OTP to phone number and verify
  //   setVerificationMethod('phone');
  //   // Send OTP to phone number 'phone'
  //   try {
  //     // API call to send OTP to phone
  //     // Await for response and set verification status based on response
  //     setVerificationStatus('OTP sent to your phone');
  //   } catch (error) {
  //     console.error('Error sending OTP to phone:', error);
  //     setVerificationStatus('Error sending OTP to phone');
  //   }
  // };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    console.log("clicked")
    try {
      const res = await fetch("api/auth/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          otp: otp,
        })
      });
      if (!res.ok) {
        throw new Error("Failed to verify OTP");
      }
      setVerificationStatus("verified");
      console.log("OTP verification successful"); // Log successful verification
      // Handle successful OTP verification here
    } catch (error) {
      console.error("Error verifying OTP:", error.message); // Log error
      // Handle error here
    }
  };
  

  return (
    <div>
      <h1>Verify Email and Phone via OTP</h1>
      <div>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleEmailVerification}>Send OTP to Email</button>
      </div>
      {/* <div>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handlePhoneVerification}>Send OTP to Phone</button>
      </div> */}
      <div>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <button onClick={handleVerifyOTP}>Verify OTP</button>
      </div>
       {/* <div>
        Verification Method: {verificationMethod}
      </div> */}
      <div>
        Verification Status: {verificationStatus === "verified" ? (
          <span className="text-green-500">Verified</span>
        ) : verificationStatus === "pending" ? (
          <span className="text-yellow-500">Pending</span>
        ) : (
          <span className="text-red-500">Not Verified</span>
        )}
      </div>

    </div>
  );
}

export default Verification;
