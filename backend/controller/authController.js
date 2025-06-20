// Import required modules
import bcrypt from 'bcryptjs' // for hashing passwords securely
import jwt from 'jsonwebtoken' // for generating JSON Web Tokens
import userModel from '../models/userModel.js' // import the Mongoose User model

// =========================
// REGISTER CONTROLLER
// =========================
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing details' });
    }

    try {
        // Check if user with email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save(); // Save user to DB

        // Generate JWT token with 7-day expiry
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set cookie with JWT
        res.cookie('token', token, {
            httpOnly: true, // prevents access from JavaScript
            secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.json({ success: true, message: 'Registration successful' });

    } catch (error) {
        // Catch and send error if registration fails
        res.json({ success: false, message: error.message });
    }
};

// =========================
// LOGIN CONTROLLER
// =========================
export const login = async (req, res) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email' });
        }

        // Compare input password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Set cookie with JWT
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({ success: true, message: 'Login successful' });

    } catch (error) {
        // Handle errors (e.g., DB issue)
        return res.json({ success: false, message: error.message });
    }
};

// =========================
// LOGOUT CONTROLLER
// =========================
export const logout = async (req, res) => {
    try {
        // Clear the token cookie to log user out
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged out" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
