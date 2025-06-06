// Import the Brand model
const Brand = require('../models/brandModel');

// Create a new brand
const createBrand = async (req, res) => {
    try {
        const { name } = req.body;              // Extract brand name from request body
        const image = req.file?.filename;       // Extract uploaded image filename (if available via multer)

        // Validate name and image
        if (!name || !image) {
            return res.status(400).json({
                success: false,
                message: "Name and image are required"
            });
        }

        // Create a new brand record in the database
        const newBrand = await Brand.create({ name, image });

        // Return the newly created brand
        return res.status(201).json({
            success: true,
            brand: newBrand
        });

    } catch (error) {
        // Log and return a 500 error if something fails
        console.error("Error creating brand:", error); // fixed `err` to `error`
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get all brands
const getAllBrand = async (req, res) => {
    try {
        // Fetch all brand records from DB
        const brands = await Brand.findAll();

        // Map and format image URL
        const modifiedBrands = brands.map((brand) => ({
            id: brand.id,
            name: brand.name,
            image: `http://localhost:7000/uploads/${brand.image}` // Construct full image URL
        }));

        // Send formatted data
        res.status(200).send({
            brands: modifiedBrands,
            success: true
        });

    } catch (error) {
        // Handle errors
        res.status(500).send({ error: error.message });
    }
};

// Update a brand by ID
const updateBrand = async (req, res) => {
    const { id } = req.params;     // Get brand ID from request params
    const { name } = req.body;     // Get new name from request body

    try {
        // Find brand by ID
        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).send({
                message: "Brand not found",
                success: false
            });
        }

        // Update brand name
        brand.name = name;
        await brand.save();

        // Respond with updated brand
        res.status(200).send({
            message: "Brand updated successfully",
            success: true,
            brand
        });

    } catch (error) {
        // Handle errors
        res.status(500).send({ error: error.message });
    }
};

// Get a brand by ID
const getBrandByID = async (req, res) => {
    const { id } = req.params;     // Get brand ID from params

    try {
        // Find brand by primary key (ID)
        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).send({
                message: "Brand not found",
                success: false
            });
        }

        // Return found brand
        res.status(200).send({
            brand,
            success: true
        });

    } catch (error) {
        // Handle errors
        res.status(500).send({ error: error.message });
    }
};

// Delete a brand by ID
const deleteBrand = async (req, res) => {
    const { id } = req.params;     // Get brand ID

    try {
        // Find brand by ID
        const brand = await Brand.findByPk(id);
        if (!brand) {
            return res.status(404).send({
                message: "Brand not found",
                success: false
            });
        }

        // Delete the brand
        await brand.destroy();

        // Return success response
        res.status(200).send({
            message: "Brand deleted successfully",
            success: true
        });

    } catch (error) {
        // Handle errors
        res.status(500).send({ error: error.message });
    }
};

// Export all controller functions
module.exports = {
    getAllBrand,
    createBrand,
    getBrandByID,
    updateBrand,
    deleteBrand
};
