const nodemailer = require('nodemailer');

// Set up the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shashanksheelavantar93@gmail.com',
        pass: 'wenr kmmd onge cjpx'
    }
});

// Define the mail-sending function
const sendEmail = () => {
    const mailOptions = {
        from: 'shashanksheelavantar93@gmail.com',
        to: 'srujanbn123@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Export the function
module.exports = sendEmail;
