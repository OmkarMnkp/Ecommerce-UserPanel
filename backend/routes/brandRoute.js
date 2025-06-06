
const brandController = require('../controller/brandController');
const express = require('express');
const { isAdmin } = require('../Middlewear/isAdmin');
const { auth } = require('../Middlewear/auth');
const upload = require('../Middlewear/multer')
const router = express.Router();


router.get('/getAllBrand', auth, brandController.getAllBrand);
router.get('/getBrandByID/:id', auth, brandController.getBrandByID);
router.post('/create', auth, isAdmin, upload.single('image'), brandController.createBrand);
router.put('/updateBrand/:id', auth, isAdmin, brandController.updateBrand);
router.delete('/deleteBrand/:id', auth, isAdmin, brandController.deleteBrand);

module.exports = router;