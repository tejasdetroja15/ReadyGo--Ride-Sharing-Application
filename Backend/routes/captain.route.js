const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const multer = require('multer');


const upload = multer({ storage: multer.memoryStorage() }); // Example: store file in memory as a Buffer

router.post('/register', [
    upload.single('upiScanner'), // Use multer to handle a single file upload with the field name 'upiScanner'
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type'),
    ], captainController.registerCaptain);



router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
], captainController.loginCaptain);

router.get('/profile', authMiddleware.authCaptain ,captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.getlogoutCaptain)

module.exports = router; 