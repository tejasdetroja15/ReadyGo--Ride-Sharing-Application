import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { ride } = location.state || {};

    if (!ride) {
        navigate('/home');
        return null;
    }

    // Prepend backend URL if needed
    const backendUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:4000';
    const qrImageUrl = ride.captain.upiScannerImageUrl
        ? ride.captain.upiScannerImageUrl.startsWith('http')
            ? ride.captain.upiScannerImageUrl
            : `${backendUrl}${ride.captain.upiScannerImageUrl.startsWith('/') ? '' : '/'}${ride.captain.upiScannerImageUrl}`
        : '';

    const handlePayment = () => {
        toast.success('Payment successful!');
        navigate('/home');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <Link to="/riding" className="text-gray-600 hover:text-gray-800">
                        <i className="ri-arrow-left-line text-2xl"></i>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">Payment</h1>
                    <div className="w-6"></div> {/* Spacer for alignment */}
                </div>

                {/* Payment Card */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Scan to Pay</h2>
                        <p className="text-gray-600">Scan the QR code to complete your payment</p>
                    </div>

                    {/* UPI QR Code */}
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                            <img 
                                src={qrImageUrl} 
                                alt="UPI QR Code" 
                                className="w-64 h-64 object-contain"
                                onError={e => e.target.style.display = 'none'}
                            />
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Ride Fare</span>
                            <span className="text-xl font-semibold">₹{ride.fare}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600">Payment Method</span>
                            <span className="text-gray-800">UPI</span>
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-sm font-medium text-blue-800 mb-2">Payment Instructions:</h3>
                        <ol className="text-sm text-blue-700 space-y-2">
                            <li>1. Open your UPI app (Google Pay, PhonePe, etc.)</li>
                            <li>2. Scan the QR code above</li>
                            <li>3. Verify the amount and pay</li>
                            <li>4. Keep the payment receipt for your records</li>
                        </ol>
                    </div>
                </div>

                {/* Payment Status */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <button 
                        onClick={handlePayment}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                        I've Made the Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment; 