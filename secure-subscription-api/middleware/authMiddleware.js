import jwt from "jsonwebtoken";
import TokenBlacklist from "../blacklist/tokenBlacklist.js";

export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || TokenBlacklist.has(token)) return res.status(403).json({ error: "Token invalid or blacklisted" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

export const authorizeRoles = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Access denied" });
    next();
};