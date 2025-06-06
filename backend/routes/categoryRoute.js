
const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const { isAdmin } = require('../Middlewear/isAdmin');
const { auth } = require('../Middlewear/auth');




router.get('/getAll',auth, categoryController.getAllCategory);
router.get('/get/:id',auth, categoryController.getCategoryByID);

router.post('/create',auth,isAdmin, categoryController.createCategory);
router.put('/update/:id',auth,isAdmin, categoryController.updateCategory);
router.delete('/delete/:id',auth,isAdmin, categoryController.deleteCategory);

module.exports = router;
