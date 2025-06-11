/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useRef, useContext, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import WaitingForDriver from '../components/WaitingForDriver'
import LookingForDriver from '../components/LookingForDriver'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import LiveTracking from '../components/LiveTracking'


const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)
    const [loading, setLoading] = useState(false)
    const [locating, setLocating] = useState(false)
    const [locationStatus, setLocationStatus] = useState('')

    const navigate = useNavigate();

    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user._id })
    }, [user])

    socket.on('ride-confirmed', ride => {
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } })
    })

    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
            setPickupSuggestions(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24,
                duration: 0.5,
                ease: 'power2.inOut'
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1,
                duration: 0.3,
                delay: 0.2
            })
            // Make space for the header when panel opens
            gsap.to('.h-screen.absolute', {
                paddingTop: '80px',
                duration: 0.5
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0,
                duration: 0.5,
                ease: 'power2.inOut'
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0,
                duration: 0.2
            })
            // Reset padding when panel closes
            gsap.to('.h-screen.absolute', {
                paddingTop: '0px',
                duration: 0.5
            })
        }
    }, [panelOpen])

    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)',
                duration: 0.5,
                ease: 'power2.out'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)',
                duration: 0.4,
                ease: 'power2.in'
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)',
                duration: 0.5,
                ease: 'power2.out'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)',
                duration: 0.4,
                ease: 'power2.in'
            })
        }
    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)',
                duration: 0.5,
                ease: 'power2.out'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)',
                duration: 0.4,
                ease: 'power2.in'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)',
                duration: 0.5,
                ease: 'power2.out'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)',
                duration: 0.4,
                ease: 'power2.in'
            })
        }
    }, [waitingForDriver])

    async function findTrip() {
        if (!pickup || !destination) {
            alert("Please enter pickup and destination locations");
            return;
        }
        
        setLoading(true);
        setVehiclePanel(true);
        setPanelOpen(false);

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            setFare(response.data);
        } catch (err) {
            console.error("Error fetching fare:", err);
            alert("Unable to calculate fare. Please try again.");
            setVehiclePanel(false);
        } finally {
            setLoading(false);
        }
    }

    async function createRide() {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
                pickup, destination, vehicleType
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            setLoading(false);
        } catch (err) {
            console.error("Error creating ride:", err);
            setLoading(false);
            alert("Unable to create ride. Please try again.");
        }
    }

    // Handler for location button
    const handleGetCurrentLocation = async () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        setLocating(true);
        setLocationStatus('Locating...');
        let didRespond = false;
        const geoTimeout = setTimeout(() => {
            if (!didRespond) {
                setLocating(false);
                setLocationStatus('');
                alert('Location request timed out. Please try again.');
            }
        }, 10000); // 10 seconds timeout

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                didRespond = true;
                clearTimeout(geoTimeout);
                setLocationStatus('Fetching address...');
                const { latitude, longitude } = position.coords;
                try {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-address-from-coords`, {
                        params: { lat: latitude, lng: longitude },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('userToken')}`
                        }
                    });
                    if (response.data && response.data.address) {
                        setPickup(response.data.address);
                    } else {
                        alert('Could not fetch address from location');
                    }
                } catch (err) {
                    alert('Failed to get address from location');
                } finally {
                    setLocating(false);
                    setLocationStatus('');
                }
            },
            (error) => {
                didRespond = true;
                clearTimeout(geoTimeout);
                setLocating(false);
                setLocationStatus('');
                alert('Unable to retrieve your location');
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    return (
        <div className='h-screen relative overflow-hidden bg-gray-50'>
            <div className='fixed top-0 w-screen z-50 bg-white shadow-md px-4 md:px-8 py-3 md:py-5 flex items-center justify-between'>
                <div className="flex items-center gap-3 border-r pr-4 border-gray-200">
                    <img
                        className='w-24 md:w-28 h-auto object-contain transition-transform duration-300 hover:scale-105'
                        src="/images/Readygo-logo.png"
                        alt="Yatraa Logo"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Link to='/profile' className='group relative h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full shadow-sm hover:bg-blue-100 transition-all'>
                        <i className="ri-user-line text-lg text-gray-700 group-hover:text-blue-600 transition-all"></i>
                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full shadow-md hidden group-hover:block">
                            You
                        </span>
                    </Link>

                    <Link to='/users/logout' className='group h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full shadow-sm hover:bg-red-100 transition-all'>
                        <i className="ri-logout-box-r-line text-lg text-gray-700 group-hover:text-red-600 transition-all"></i>
                    </Link>
                </div>
            </div>



            {/* Map Background */}
            <div className='h-screen w-screen z-0 fixed top-0'>
                <LiveTracking />
            </div>

            {/* Main Content */}
            <div className='flex flex-col justify-end h-screen absolute top-5 w-full pt-16'>
                {/* Bottom Input Panel */}
                <div className='h-auto p-5 rounded-t-3xl bg-white relative shadow-[0_-5px_25px_rgba(0,0,0,0.1)]'>
                    <h5 
                        ref={panelCloseRef} 
                        onClick={() => {
                            setPanelOpen(false)
                        }} 
                        className='absolute cursor-pointer opacity-0 right-6 top-6 text-3xl'
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    
                    <div className="flex items-center mb-4">
                        <h4 className='text-2xl font-bold text-gray-800'>Find Your Ride</h4>
                        {user && (
                            <div className="ml-3 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                Welcome, {user.name?.split(' ')[0] || 'User'}
                            </div>
                        )}
                    </div>
                    
                    <form className='relative py-3' onSubmit={(e) => { submitHandler(e) }}>
                        <div className="relative flex items-center">
                            <div className="absolute left-0 h-full flex flex-col items-center justify-between px-4">
                                <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                    <i className="ri-map-pin-line text-sm"></i>
                                </div>
                                <div className="h-6 border-l-2 border-dashed border-gray-300"></div>
                                <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                                    <i className="ri-flag-line text-sm"></i>
                                </div>
                            </div>
                            <div className="flex-1 pl-12 space-y-3 relative">
                                <div className="relative">
                                    <input
                                        onClick={() => {
                                            setPanelOpen(true)
                                            setActiveField('pickup')
                                        }}
                                        value={pickup}
                                        onChange={handlePickupChange}
                                        className='bg-gray-100 px-4 py-3 text-base rounded-xl w-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                                        type="text"
                                        placeholder='Add a pick-up location'
                                    />
                                    <button
                                        type="button"
                                        onClick={handleGetCurrentLocation}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-all border border-gray-200"
                                        style={{ zIndex: 2 }}
                                        disabled={locating}
                                        aria-label="Use current location"
                                    >
                                        {locating ? (
                                            <span className="flex items-center gap-1">
                                                <svg className="animate-spin h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span className="text-xs text-gray-500">{locationStatus}</span>
                                            </span>
                                        ) : (
                                            <i className="ri-focus-3-line text-xl text-gray-700"></i>
                                        )}
                                    </button>
                                </div>
                                <input
                                    onClick={() => {
                                        setPanelOpen(true)
                                        setActiveField('destination')
                                    }}
                                    value={destination}
                                    onChange={handleDestinationChange}
                                    className='bg-gray-100 px-4 py-3 text-base rounded-xl w-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
                                    type="text"
                                    placeholder='Enter your destination'
                                />
                            </div>
                        </div>
                    </form>
                    
                    <button
                        onClick={findTrip}
                        disabled={loading || !pickup || !destination}
                        className={`bg-black text-white px-4 py-3 rounded-xl w-full text-base font-medium shadow-md hover:bg-gray-800 transition-all flex items-center justify-center ${(!pickup || !destination) ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            <>
                                <i className="ri-taxi-line mr-2"></i>
                                Find Trip
                            </>
                        )}
                    </button>
                    
                    <div className="flex justify-center mt-4">
                        <div className="text-xs text-gray-500 flex items-center">
                            <i className="ri-shield-check-line mr-1"></i>
                            Your ride is protected with end-to-end encryption
                        </div>
                    </div>
                </div>

                {/* Location Search Panel */}
                <div ref={panelRef} className='bg-white h-0 shadow-lg overflow-hidden z-40'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>

                {/* Vehicle Panel */}
                <div ref={vehiclePanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white rounded-t-3xl px-6 py-8 shadow-xl'>
                    <VehiclePanel
                        selectVehicle={setVehicleType}
                        fare={fare}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehiclePanel={setVehiclePanel}
                    />
                </div>

                {/* Confirm Ride Panel */}
                <div ref={confirmRidePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white rounded-t-3xl px-6 py-8 shadow-xl'>
                    <ConfirmRide
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare} 
                        vehicleType={vehicleType}
                        setVehiclePanel={setVehiclePanel}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehicleFound={setVehicleFound}
                    />
                </div>

                {/* Looking For Driver Panel */}
                <div ref={vehicleFoundRef} className='fixed w-full z-40 bottom-0 translate-y-full bg-white rounded-t-3xl px-6 py-8 shadow-xl'>
                    <LookingForDriver
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setVehicleFound={setVehicleFound}
                    />
                </div>

                {/* Waiting For Driver Panel */}
                <div ref={waitingForDriverRef} className='fixed w-full z-50 bottom-0 translate-y-full bg-white rounded-t-3xl px-6 py-8 shadow-xl'>
                    <WaitingForDriver
                        ride={ride}
                        setWaitingForDriver={setWaitingForDriver}
                        waitingForDriver={waitingForDriver}
                    />
                </div>
            </div> 
            
            {/* Location Button */}
            {/* <button className="fixed bottom-40 right-6 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all">
                <i className="ri-focus-3-line text-xl text-gray-700"></i>
            </button> */}
            
            {/* Removed Home/Work/Saved buttons as requested */}
        </div>
    )
}

export default Home