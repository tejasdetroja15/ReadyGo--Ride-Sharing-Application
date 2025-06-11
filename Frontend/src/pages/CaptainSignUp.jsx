// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';
import { toast } from 'react-toastify';

const CaptainSignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [upiScanner, setUpiScanner] = useState(null);
  const [upiScannerPreview, setUpiScannerPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { setCaptain } = useContext(CaptainDataContext);

  const handleUpiScannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpiScanner(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpiScannerPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('fullname[firstname]', firstName);
    formData.append('fullname[lastname]', lastName);
    formData.append('vehicle[color]', vehicleColor);
    formData.append('vehicle[plate]', vehiclePlate);
    formData.append('vehicle[capacity]', vehicleCapacity);
    formData.append('vehicle[vehicleType]', vehicleType);

    if (upiScanner) {
      formData.append('upiScanner', upiScanner);
    }

    console.log("FormData entries:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Registration successful:', response.data);

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('captainToken', data.token);
        toast.success('Signup successful!');
        navigate('/captain-home');
      }
    } catch (err) {
      console.error('Full error object during registration:', err);
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        console.error('Error response headers:', err.response.headers);
        if (err.response.data?.errors) {
          const errorMessages = err.response.data.errors.map(error => `${error.msg} (for ${error.path})`).join('; ');
          setError(`Validation failed: ${errorMessages}`);
        } else if (err.response.data?.message) {
          setError(err.response.data.message);
        } else {
          setError('Failed to register. Please check console for details.');
        }
      } else if (err.request) {
        console.error('Error request data:', err.request);
        setError('No response from server. Please check network or server status.');
      } else {
        console.error('Error message:', err.message);
        setError(`An unexpected error occurred: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col md:flex-row">
      {/* Left side - Image/Brand section */}
      <div className="hidden lg:flex lg:w-1/3 bg-[#ff6b00] relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="z-10 p-12 flex flex-col h-full justify-between">
          <div>
            <div className="bg-white rounded-lg p-3 inline-block shadow-lg">
              <img className="h-10 w-auto" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="Driver Logo" />
            </div>
            <h1 className="text-4xl font-bold text-white mt-16">Join Our Fleet</h1>
            <p className="text-xl text-white mt-4 max-w-md">
              Start your journey as a professional driver and enjoy flexible working hours and competitive earnings.
            </p>
          </div>
          <div className="flex space-x-2">
            <div className="h-3 w-3 bg-white rounded-full"></div>
            <div className="h-3 w-3 bg-white rounded-full opacity-60"></div>
            <div className="h-3 w-3 bg-white rounded-full opacity-60"></div>
          </div>
        </div>
        <div className="absolute inset-0 z-0">
          {/* Background pattern for left panel */}
          <svg className="absolute bottom-0 left-0 opacity-20" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,70 C40,100 60,100 100,70 L100,100 L0,100 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8 lg:hidden">
            <div className="rounded-lg p-3 ">
              <img className="h-10 w-auto" src="/images/Readygo-logo.png" alt="Driver Logo" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Driver Registration</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="hidden lg:block text-2xl font-bold text-gray-800 mb-2">Driver Registration</h2>
            <p className="text-gray-600 mb-6">Complete your profile to start earning with us</p>
            
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={submitHandler}>
              {/* Personal Information Section */}
              <div className="pb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] text-sm"
                      type="text"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] text-sm"
                      type="text"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] text-sm"
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] text-sm"
                      type="password"
                      placeholder="Create a secure password"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information Section */}
              <div className="pt-2">
                <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">Vehicle Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="vehicleColor" className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Color
                    </label>
                    <input
                      id="vehicleColor"
                      required
                      value={vehicleColor}
                      onChange={(e) => setVehicleColor(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] text-sm"
                      type="text"
                      placeholder="e.g., White"
                    />
                  </div>
                  <div>
                    <label htmlFor="vehiclePlate" className="block text-sm font-medium text-gray-700 mb-1">
                      License Plate Number
                    </label>
                    <input
                      id="vehiclePlate"
                      required
                      value={vehiclePlate}
                      onChange={(e) => setVehiclePlate(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] text-sm uppercase"
                      type="text"
                      placeholder="e.g., AB123CD"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="vehicleCapacity" className="block text-sm font-medium text-gray-700 mb-1">
                      Seating Capacity
                    </label>
                    <input
                      id="vehicleCapacity"
                      required
                      value={vehicleCapacity}
                      onChange={(e) => setVehicleCapacity(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] text-sm"
                      type="number"
                      min="1"
                      max="20"
                      placeholder="e.g., 4"
                    />
                  </div>
                  <div>
                    <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Type
                    </label>
                    <select
                      id="vehicleType"
                      required
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] text-sm"
                    >
                      <option value="" disabled>Select Vehicle Type</option>
                      <option value="car">Car</option>
                      <option value="auto">Auto</option>
                      <option value="motorcycle">Motorcycle</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <label htmlFor="upiScanner" className="block text-sm font-medium text-gray-700 mb-1">
                  UPI QR Code Scanner
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {upiScannerPreview ? (
                      <div className="mb-4">
                        <img
                          src={upiScannerPreview}
                          alt="UPI QR Code Preview"
                          className="mx-auto h-32 w-32 object-contain"
                        />
                      </div>
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="upiScanner"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-[#ff6b00] hover:text-[#e06000] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#ff6b00]"
                      >
                        <span>Upload a file</span>
                        <input
                          id="upiScanner"
                          name="upiScanner"
                          type="file"
                          accept="image/*"
                          onChange={handleUpiScannerChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#ff6b00] hover:bg-[#e06000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b00] transition duration-150"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account? {" "}
                <Link to="/captain-login" className="font-medium text-[#ff6b00] hover:text-[#e06000]">
                  Sign in here
                </Link>
              </p>
            </div>
            
            <div className="mt-8 pt-4 text-center text-xs text-gray-500">
              <p>
                This site is protected by reCAPTCHA and the{" "}
                <a href="#" className="text-[#ff6b00] hover:text-[#e06000]">Google Privacy Policy</a> and{" "}
                <a href="#" className="text-[#ff6b00] hover:text-[#e06000]">Terms of Service</a> apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignUp;