/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (isNaN(value) || value.length > 1) return; // Ensure only one digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    // Simulate verifying OTP (replace with actual API call)
    const isValidOtp = enteredOtp === '1234'; // Replace this with server-side OTP verification logic

    if (isValidOtp) {
      setIsVerified(true);
      alert('Email verified successfully!');
      navigate('/dashboard'); // Navigate to the dashboard or another page after successful verification
    } else {
      alert('Invalid OTP. Please try again.');
      setOtp(['', '', '', '']);
      document.getElementById('otp-0').focus();
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Verify Your Email</h1>
        <p className="text-center mb-6">We have sent a 4-digit OTP to your email. Please enter it below to verify your email.</p>
        <form onSubmit={handleOtpSubmit} className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              className="bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg text-center w-12"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
            />
          ))}
        </form>
        <button
          type="submit"
          onClick={handleOtpSubmit}
          className="bg-[#111] flex items-center justify-center text-white font-semibold rounded-lg px-4 py-2 w-full text-lg"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;