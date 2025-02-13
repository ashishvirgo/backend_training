const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "ashishvirgo12@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const sendEmail=async(email,otp)=>{
    const info ={
        from: "Ashish_ ABES_ Canteen",
        to: email,
        subject: "OTP varification from ABES Canteen Registration",
        html: `
            <div>
                <p>This is the security email from ABES Canteen App. Please DO NOT share the otp with anyone</p>
                <h4>OTP: ${otp}</h4>
                <p>Copyright@ABES-Canteen-App</p>
            </div>
        `, 
      };
      try{
        const resp= await transporter.sendMail(info);
        console.log("Message sent: %s", resp.messageId);
        return true;
    } catch (err) {
        console.log(err.message);
        return false;
    }
      }
    
     

  module.exports=sendEmail;