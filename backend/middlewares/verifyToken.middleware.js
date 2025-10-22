import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    try {
        const token = req?.cookies?.token || "";
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" });
        }
        console.error("Token verification error:", error);
        return res.status(500).json({ message: "Internal Server error" });
    }
}

export default verifyToken;