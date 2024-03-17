import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, text) => {
	const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        secure: process.env.SECURE,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
      
      const mailOptions={
          from:process.env.USER,
          to:email,
          subject:subject,
          text:text
      }
      try{
        transporter.sendMail(mailOptions)
        console.log("mail sent")
      }
      catch(error){
        console.log(error)
        console.log("mail not sent")
      }
};


