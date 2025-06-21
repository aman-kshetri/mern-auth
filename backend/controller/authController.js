// Import required modules
import bcrypt from 'bcryptjs' // for hashing passwords securely
import jwt from 'jsonwebtoken' // for generating JSON Web Tokens
import userModel from '../models/userModel.js' // import the Mongoose User model
import transporter from '../config/nodemailer.js';

// Register User
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

        //Sending welcome mail
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to:email,
            subject: 'Welcome...',
            text: `Your account has been created with email id: ${email}`
        }

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'Registration successful' });

    } catch (error) {
        // Catch and send error if registration fails
        res.json({ success: false, message: error.message });
    }
};

// Login User
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

// Logout User
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

//Send Verification OTP to User's Email
export const sendVerifyOtp = async (req, res) => {
    try {

        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(user.isAccountVerified){
            return res.json({success: false, message:"Account already verified"})
        }
        
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000

        await user.save();

        const mailOption = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Your OTP is ${otp}. Verify your account using this OTP.`
        }

        await transporter.sendMail(mailOption);

        res.json({success:true, message: 'Verification OTP sent on Email'});
        
    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

export const verifyEmail = async(req,res) => {
    const {userId, otp} = req.body;

    if(!userId || !otp) {
        return res.json({success:false, message:"Missing Details"});
    }

    try {
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success: false, message:'User not found'});
        }

        if (user.verifyOtp === '' || user.verifyOtp !==otp){
            return res.json({success:false, message:'Invalid OTP'})
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success:false, message: 'OTP Expired'});
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return res.json({success:true, message: 'Email verified successfully'})
        
    } catch (error) {
        return res.json({success:false, message:error.message})
    }
}