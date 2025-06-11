import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Car, MapPin, Navigation } from 'lucide-react';

const SplashScreen = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show the button after 2.5 seconds
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    navigate('/home'); // Navigate to main dashboard
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 to-slate-800 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 z-0">
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      {/* Premium Gold Accent */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Logo and Brand */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12 flex flex-col items-center"
      >
        <div className="flex items-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full p-3 shadow-xl shadow-amber-900/20 flex items-center justify-center"
          >
            <img
              className="h-12 w-auto mx-auto"
              src="/images/Readygo-logo.png"
              alt="RideNow Logo"
            />
          </motion.div>
          <motion.h1
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-5xl font-extrabold ml-4 flex items-center"
          >
          
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-gray-300 mt-3 font-medium"
        >
          Premium rides at your fingertips
        </motion.p>
      </motion.div>

      {/* New City Map Animation */}
      <motion.div
        className="relative w-72 h-72 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Premium Glowing Circle */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-slate-800"
          style={{ boxShadow: "0 0 60px rgba(251, 191, 36, 0.15)" }}
        />
        
        <motion.div 
          className="absolute inset-2 rounded-full border border-slate-700"
        />
        
        {/* City Grid Lines */}
        <motion.div className="absolute inset-8 opacity-30">
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            {/* Horizontal Lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.line 
                key={`h-${i}`}
                x1="0" 
                y1={40 * i} 
                x2="200" 
                y2={40 * i} 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.1 * i }}
              />
            ))}
            
            {/* Vertical Lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.line 
                key={`v-${i}`}
                x1={40 * i} 
                y1="0" 
                x2={40 * i} 
                y2="200" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.1 * i }}
              />
            ))}
          </svg>
        </motion.div>
        
        {/* Route Animation */}
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <svg width="180" height="180" viewBox="0 0 200 200">
            <motion.path
              d="M50,100 C50,60 100,40 150,100 C150,140 100,160 50,100"
              fill="none"
              stroke="rgba(251, 191, 36, 0.8)"
              strokeWidth="3"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>

        {/* Starting Point */}
        <motion.div 
          className="absolute top-1/2 left-[50px] transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-emerald-500 p-1 rounded-full shadow-lg shadow-emerald-500/30">
            <Navigation size={16} className="text-white" />
          </div>
          <motion.div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-5 bg-black/40 rounded-full blur-sm -z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          />
        </motion.div>

        {/* Destination Point */}
        <motion.div 
          className="absolute top-1/2 right-[50px] transform translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="bg-red-500 p-1 rounded-full shadow-lg shadow-red-500/30">
            <MapPin size={16} className="text-white" />
          </div>
          <motion.div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-5 bg-black/40 rounded-full blur-sm -z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 }}
          />
        </motion.div>

        {/* Moving Car with subtle trail effect */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2"
          initial={{ left: "50px", rotate: 0 }}
          animate={{ 
            left: ["50px", "100px", "150px"],
            top: ["50%", "35%", "50%"],
            rotate: [0, -20, 0]
          }}
          transition={{ 
            duration: 2, 
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        >
          {/* Shadow under car */}
          <motion.div 
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-black/40 rounded-full blur-sm -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Car icon */}
          <div className="bg-white p-2 rounded-full shadow-lg shadow-amber-500/20">
            <Car size={20} className="text-slate-900" />
          </div>
          
          {/* Trailing Motion Blur Effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <div className="w-20 h-12 bg-amber-400/20 rounded-full blur-md" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Start Button with Fade In - Premium Style */}
      <motion.button
        onClick={handleStart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(251, 191, 36, 0.5)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="z-20 flex items-center bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold shadow-lg shadow-amber-900/20 pointer-events-auto"
        type="button"
      >
        Experience Premium  
        <ChevronRight className="ml-2" size={20} />
      </motion.button>

      {/* Loading Dots (shows only before button appears) */}
      {!showButton && (
        <motion.div 
          className="mt-8 flex items-center justify-center space-x-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-3 h-3 bg-amber-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "loop",
                delay: dot * 0.2
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SplashScreen;