const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware.js');
const mapController = require('../controllers/maps.controllers')
const {query} = require('express-validator');

router.get('/get-coordinates' , 
    query('address').isString().isLength({min:3}),
    authMiddleware.authUser , 
    mapController.getCoordinates)

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authUser ,
    mapController.getDistanceTime
)

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

router.get('/get-address-from-coords',
    query('lat').isFloat(),
    query('lng').isFloat(),
    authMiddleware.authUser,
    mapController.getAddressFromCoords
);

module.exports = router;

