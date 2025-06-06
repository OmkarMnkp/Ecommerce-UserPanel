
const Category = require('../models/categoryModel');

//  Get all categories
const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


//  Get category by ID
const getCategoryByID = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//  Create new category
const createCategory = async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json({ success: true, category: newCategory });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


//  Update category
const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const updated = await category.update(req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete category
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        await category.destroy();
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


module.exports = {
    getAllCategory,
    getCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory
};
