
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const tokenBearer = req.headers.authorization;

    if (!tokenBearer || !tokenBearer.startsWith('Bearer ')) {
        return res.status(401).send({ message: "Invalid authorization header" });
    }

    const token = tokenBearer.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'secretkey123');
        req.user = decoded; // attach user info to request
        next();
    } catch (error) {
        return res.status(401).send({ message: "Invalid or expired token", error: error.message });
    }
};

module.exports = { auth };
