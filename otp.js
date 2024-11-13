const { text } = require('express');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'shashanksheelavantar93@gmail.com',
        pass: 'wenr kmmd onge cjpx'
    }
});


const generateOTP = () => {
    return Math.floor(100000+Math.random()*900000).toString();
};

const sendOTPEmail = async (email,otp) =>{
    const mailOptions = {
        from:'shashanksheelavantar93@gmail.com',
        to: email,
        subject:'Your OTP Code',
        text:`Your OTP code is ${otp}.It will expire in 5 minutes.`
    };

try{
    await transporter.sendMail(mailOptions);
    console.log('OTP sent to email: ',email);
} catch(error){
    console.error('Error sending OTP email:',error);
}
};

module.exports = {generateOTP,sendOTPEmail};
