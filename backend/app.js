const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const sequelize = require("./config/db");

const Category = require("./models/categoryModel");
const Brand = require("./models/brandModel");
const Product = require("./models/productModel");

// Define associations
Category.hasMany(Product, { foreignKey: "category_id" });
Brand.hasMany(Product, { foreignKey: "brand_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });
Product.belongsTo(Brand, { foreignKey: "brand_id" });

// Import routes
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const User = require("./routes/user");
const sampleRoutes = require('./routes/sampleRoutes');


const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Mount routes
app.use("/api/brand", brandRoute);
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/user", User);
app.use('/api', sampleRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/images", express.static(path.join(__dirname, "images")));

// Sync DB and start server
sequelize
  .sync({ alter: true }) // safer than force:true, preserves data
  .then(() => {
    console.log("Database synced");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });
