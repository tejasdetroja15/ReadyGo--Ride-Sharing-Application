/* eslint-disable no-unused-vars */

import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { toast } from 'react-toastify';

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)  
      console.log('Registration response:', response);

      if (response.status === 200 || response.status === 201) {
        const data = response.data
        console.log('Registration successful, data:', data);
        setUser(data.user)
        localStorage.setItem('userToken', data.token)
        toast.success('Signup successful!');
        console.log('Navigating to login page...');
        navigate('/login', { replace: true });
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  // Remove old passwordStrength checker and add new validation
  const isPasswordValid = password.length === 6;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="inline-block rounded-lg p-3 shadow-lg bg-white border border-gray-200">
          <img
            className="h-12 w-auto mx-auto"
            src="/images/Readygo-logo.png"
            alt="RideNow Logo"
          />
        </div>
        <Link to="/captain-signup" className="text-sm text-gray-600 hover:text-black transition-colors">
          Sign up as Driver <i className="ri-steering-2-line ml-1"></i>
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
            <p className="text-gray-600 text-sm mt-1">Ride with us and explore the city</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">
                Full Name
              </label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    required
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <input
                    required
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={password}
                  onChange={(e) => {
                    // Only allow up to 6 characters
                    if (e.target.value.length <= 6) setPassword(e.target.value);
                  }}
                  required
                  type="password"
                  placeholder="Password (6 characters only)"
                  maxLength={6}
                />
                {password && (
                  <div className="absolute right-3 top-2.5 flex items-center">
                    <div className="flex space-x-1">
                      <div className={`h-1.5 w-5 rounded-full ${
                        isPasswordValid ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                  </div>
                )}
              </div>
              {password && (
                <p className="text-xs text-gray-500 mt-1">
                  {isPasswordValid
                    ? 'Password length is valid'
                    : 'Password must be exactly 6 characters'}
                </p>
              )}
            </div>

            <div className="flex items-start mt-2">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                />
              </div>
              <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isPasswordValid}
              className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </>
              ) : (
                <>Create Account</>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">Sign in</Link>
            </p>
          </div>
          
          <div className="mt-10 pt-5 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By signing up, you agree to our Terms of Service and acknowledge our Privacy Policy.
              This site is protected by reCAPTCHA.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSignup