const express = require('express');
const { getQuestionLevel } = require('./connection'); // Ensure casing is consistent
const sendEmail = require('./email'); // Make sure the path to email.js is correct
const { generateOTP, sendOTPEmail } = require('./otp'); // Correct import path for OTP functions

const app = express();
const port = 8000;


// Create a Map to temporarily store OTPs
const otpStore = new Map();


// Middleware to parse JSON bodies
app.use(express.json());

// Route to get questions based on level
app.get('/question/level', async (req, res) => {
    const level = 'Easy';
    try {
        const questions = await getQuestionLevel(level);
        res.json(questions);
    } catch (error) {
        res.status(500).json({ error: "Error fetching questions" });
    }
});

// Route to send email (example usage)
app.get('/send-email', (req, res) => {
    try {
        sendEmail(); // Call the sendEmail function from email.js
        res.send('Email has been sent!');
    } catch (error) {
        res.status(500).json({ error: "Error sending email" });
    }
});

// Route to request OTP
// Route to request OTP
app.post('/request-otp', async (req, res) => {
    const { email } = req.body;  // Get email from the request body
    const otp = generateOTP();  // Generate OTP using your OTP function

    // Store the OTP in the otpStore Map with an expiration time (5 minutes)
    otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 });

    console.log(otpStore); // Log to see the current state of otpStore

    // Send the OTP email (ensure sendOTPEmail is properly defined in './otp')
    await sendOTPEmail(email, otp);

    res.send('OTP sent to your email.');
});


// Route to verify OTP
app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body; // Extract email and OTP from the request body
    const storedOtp = otpStore.get(email); // Get the OTP from the otpStore

    // Check if the OTP exists and is valid
    if (storedOtp) {
        if (storedOtp.otp === otp && Date.now() < storedOtp.expires) {
            otpStore.delete(email); // Delete the OTP after successful verification
            res.send('OTP verification successful!');
        } else {
            res.status(400).send('Invalid or expired OTP.');
        }
    } else {
        res.status(400).send('OTP not found for this email.');
    }
});


console.log(otpStore);
const email = "shashanksheelavantar93@gmail.com"; // Replace with the email you want to check
console.log(otpStore.get(email));

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
