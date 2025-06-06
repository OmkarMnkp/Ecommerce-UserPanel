const CartItem = require("../models/CartItem");
const { products } = require("../sampleProducts"); // Static products array

// ✅ Get all static products
exports.getAllProducts = (req, res) => {
  if (!products || !Array.isArray(products)) {
    return res.status(500).json({ error: "Products not available" });
  }

  res.json(products);
};

// ✅ Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    console.log("Request body:", req.body);
    console.log("User ID:", userId);

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    const product = products.find((p) => p.id === productId);
    if (!product) {
      console.log("Product not found for ID:", productId);
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await CartItem.findOne({ where: { userId, productId } });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ userId, productId, quantity });
    }

    return res.status(200).json(cartItem);
  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};


// ✅ Get all cart items for the logged-in user
exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await CartItem.findAll({ where: { userId } });

    // ✅ Manually attach product info from static array
    const fullCart = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item.toJSON(),
        product,
      };
    });

    return res.status(200).json(fullCart);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    await CartItem.destroy({ where: { userId, productId } });
    return res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
