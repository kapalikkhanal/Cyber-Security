const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1y";

class AuthController {
  static async signup(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Check if user exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Create new user
      const newUser = await User.create({ name, email, password });

      // Generate JWT
      const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        algorithm: 'HS256'
      });

      res.json({
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ error: "Server error during signup" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check password
      const isMatch = await User.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT with proper expiration
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
        algorithm: 'HS256'
      });

      console.log(`Generated token for ${email}: ${token}`);
      console.log(`Token expires in: ${JWT_EXPIRES_IN}`);

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async verifyToken(req, res) {
    res.json({
      user: req.user,
      valid: true,
    });
  }
}

module.exports = AuthController;
