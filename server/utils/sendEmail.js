import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, text) => {
	const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        secure: process.env.SECURE,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });
      
      const mailOptions={
          from:process.env.EMAIL,
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


