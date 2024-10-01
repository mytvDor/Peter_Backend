// // const express = require('express');
// // const cors = require('cors');
// // const dotenv = require('dotenv');
// // const connectDB = require('./config/db');
// // const authRoutes = require('./routes/authRoutes');
// // const userRoutes = require('./routes/userRoutes');

// // dotenv.config();
// // connectDB();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // app.use('/api/auth', authRoutes);
// // app.use('/api/users', userRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const youtubeRoutes = require('./routes/youtubeRoutes'); // Add YouTube URL routes

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/youtube', youtubeRoutes); 
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const youtubeRoutes = require('./routes/youtubeRoutes'); 
const programRoutes = require('./routes/programRoutes'); 

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(cors({
    origin: '*', // Allows requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allows all HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allows specific headers
}));
app.use(express.json());

//auth
// mongoose.connect("mongodb+srv://collabvisioninfosolution:3Bdq1UL48QIV3D5V@cluster0.s5lok.mongodb.net/authDB?retryWrites=true&w=majority"
// ).then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpire: { type: Date },
});

// Utility functions for password hashing and verification
const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = `${salt}$${crypto.createHmac('sha256', salt).update(password).digest('hex')}`;
    return hashedPassword;
};

const verifyPassword = (inputPassword, storedPassword) => {
    const [salt, hashedPassword] = storedPassword.split('$');
    const inputHashedPassword = crypto.createHmac('sha256', salt).update(inputPassword).digest('hex');
    return inputHashedPassword === hashedPassword;
};

// Hash password with salt before saving
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    this.password = hashPassword(this.password); // Use the utility function
    next();
});

const User = mongoose.model('Users', userSchema);

// Utility function to send emails
const sendEmail = async (email, subject, text) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mytvdor@gmail.com', // Your email
                pass: 'fatu ftws zsbp fwnj', // Your email password
            },
        });

        await transporter.sendMail({
            from: 'mytvdor@gmail.com',
            to: email,
            subject: subject,
            text: text,
        });
        console.log('Email sent');
    } catch (error) {
        console.log('Error sending email:', error);
    }
};

// Middleware to authenticate token from body
const authenticateToken = (req, res, next) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ msg: 'Token not provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Sign-up route
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        user = new User({ name, email, password, otp, otpExpire });
        await user.save();

        await sendEmail(user.email, 'Email Verification', `Your OTP is ${otp}`);

        res.status(201).json({ msg: 'OTP sent to your email. Please verify.' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Verify email with OTP route
app.post('/api/auth/verify-email', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email, otp, otpExpire: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ msg: 'Invalid or expired OTP' });

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();

        res.status(200).json({ msg: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Sign-in route
app.post('/api/auth/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(email, password)
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });
        if (!user.isVerified) return res.status(400).json({ msg: 'Please verify your email' });

        // Use the verifyPassword utility function
        if (!verifyPassword(password, user.password)) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '10000h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Forgot password (OTP generation) route
app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpire = Date.now() + 10 * 60 * 1000;

        user.otp = otp;
        user.otpExpire = otpExpire;
        await user.save();

        await sendEmail(user.email, 'Password Reset', `Your OTP is ${otp}`);

        res.status(200).json({ msg: 'OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Reset password route
app.post('/api/auth/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email, otp, otpExpire: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ msg: 'Invalid or expired OTP' });

        user.password = hashPassword(newPassword); // Use the utility function
        user.otp = undefined; // Clear OTP and expiration
        user.otpExpire = undefined;
        await user.save();

        res.status(200).json({ msg: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Protected route (example for checking authenticated token from body)
app.post('/api/auth/protected', authenticateToken, (req, res) => {
    res.status(200).json({ msg: `Hello, user with ID: ${req.user.userId}` });
});

// Sign-out route (stateless sign-out for JWT)
app.post('/api/auth/signout', (req, res) => {
    res.status(200).json({ msg: 'Signed out' });
});
//auth
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/programs', programRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
