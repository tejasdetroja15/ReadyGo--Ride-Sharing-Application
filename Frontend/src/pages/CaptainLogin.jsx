/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { toast } from 'react-toastify';

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const captain = {
      email: email, 
      password
    } 

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('captainToken', data.token)
        toast.success('Login successful!');
        navigate('/captain-home')
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-block rounded-full p-2 shadow-md bg-white border border-gray-200">
            <img
              className="h-12 w-auto mx-auto"
              src="/images/Readygo-logo.png"
              alt="RideNow Logo"
            />
          </div>
          <h2 className="mt-3 text-2xl font-bold text-gray-800">Driver Portal</h2>
          <p className="text-gray-600 text-sm">Sign in to your driver account</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-4" onSubmit={submitHandler}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] text-sm"
                  placeholder="Your email address"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-orange-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff6b00] focus:border-[#ff6b00] text-sm"
                  placeholder="Your password"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b00] transition duration-150"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-sm">
              <span className="text-gray-500">Want to drive with us?</span>{" "}
              <Link to="/captain-signup" className="font-medium text-[#ff6b00] hover:text-[#e06000]">
                Join our fleet
              </Link>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              to="/login"
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6b00] transition duration-150"
            >
              <svg className="h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Sign in as Passenger Instead
            </Link>
          </div>
        </div>
        
        <div className="text-center mt-4 text-xs text-gray-500">
          &copy; 2025 RideNow. All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default CaptainLogin;