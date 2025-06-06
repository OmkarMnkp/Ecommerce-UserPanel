
const express = require('express');
const {
    Register,
    Login,
    getAllUsers,
    getUserInfo
} = require('../controller/userController');

const { auth } = require('../Middlewear/auth');

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/getallusers', auth, getAllUsers);
router.get('/getUserInfo', auth, getUserInfo); // ✅ NEW ROUTE

module.exports = router;
