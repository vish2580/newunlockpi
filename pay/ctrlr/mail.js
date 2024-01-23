const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendEmail = asyncHandler(async(data, req,res)=>{
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.email,
          pass: process.env.emailpass,
          
        },
      });
    const info = await transporter.sendMail({
        from: '"Hey" <foo@gmail.com>', // sender address
        to: process.env.sendemail, // list of receivers
        subject: data.subject, // Subject line
        text: data.text, // plain text body
        html: data.html, // html body
      });
    
      
})

const passwordSend = asyncHandler(async(req,res)=>{
    const {message} = req.body;

    try{
        const resetURL = `Hi password ${message}`;
        const toemail  = `vishalsainvs20@gmail.com`;
        const data = {
            subject:"Forget Password Link",
            to: toemail,
            text :"hello user",
            html:resetURL,

        }
        sendEmail(data);
        res.json(data)
    }
    catch(error){
        throw new Error(error);
    }
})

module.exports = passwordSend
