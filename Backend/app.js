const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/user.route.js")
const captainRoutes = require("./routes/captain.route.js")
const cookieParser = require('cookie-parser');
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes.js')
const path = require('path');

const connectToDb = require('./db/db.js');
connectToDb();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'https://ready-go-ride-sharing-application.vercel.app'],
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Serve uploads directory statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/' ,(req,res) => {
    res.send('Hello World')
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

module.exports = app;