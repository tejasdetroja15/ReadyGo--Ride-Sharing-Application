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

const connectToDb = require('./db/db.js');
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/' ,(req,res) => {
    res.send('Hello World')
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);
module.exports= app;