const jwt = require("jsonwebtoken");
const User = require("../api/models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth",authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No Bearer token found");
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);

    try {
      // Verify token with debug info
      // console.log("Verifying token with secret:", JWT_SECRET);
      const decoded = jwt.verify(token, JWT_SECRET, { clockTolerance: 30 });
      console.log("Decoded token:", decoded);

      // Manual expiration check
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        console.log(`Token expired! Exp: ${decoded.exp}, Now: ${now}`);
        return res.status(401).json({
          error: "Token expired",
          expiredAt: new Date(decoded.exp * 1000),
          currentTime: new Date(),
        });
      } else {
        console.log(`Token valid! Expires at: ${new Date(decoded.exp * 1000)}`);
      }

      const user = await User.findById(decoded.userId);

      if (!user) {
        console.log("User not found for ID:", decoded.userId);
        return res.status(401).json({ error: "User not found" });
      }

      req.user = {
        id: user.id,
        email: user.email,
      };

      console.log("Authentication successful for user:", user.email);
      next();
    } catch (jwtError) {
      console.error("JWT Verification Error:", jwtError);

      if (jwtError.name === "TokenExpiredError") {
        console.log("Token expired at:", jwtError.expiredAt);
        return res.status(401).json({
          error: "Token expired",
          expiredAt: jwtError.expiredAt,
        });
      }

      return res.status(401).json({
        error: "Invalid token",
        details: jwtError.message,
      });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(500).json({
      error: "Authentication failed",
      details: error.message,
    });
  }
};

module.exports = authMiddleware;
