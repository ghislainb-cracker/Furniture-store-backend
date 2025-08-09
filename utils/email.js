import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
     host: process.env.EMAIL_HOST,
     port: parseInt(process.env.EMAIL_PORT || "587"),
     secure: process.env.EMAIL_SECURE === "true",
     auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
     },
});

// Function to send email
export const sendEmail = async (options) => {
     try {
          // Ensure the email is properly formatted
          const mailOptions = {
               from: `"Furniture Shop" <${process.env.EMAIL_FROM}>`,
               to: options.to,
               subject: options.subject,
               html: options.html,
               text: options.text || stripHtml(options.html), // Fallback to text version
               headers: {
                    "X-Laziness-level": "1000",
                    "X-Mailer": "Nodemailer",
                    "Content-Type": "text/html; charset=utf-8",
               },
          };

          const info = await transporter.sendMail(mailOptions);
          console.log("Email sent successfully:", info.messageId);
          return info;
     } catch (error) {
          console.error("Error sending email:", error);
          throw new Error("Email could not be sent: " + error.message);
     }
};

// Helper function to strip HTML tags for text version
const stripHtml = (html) => {
     return html
          .replace(/<[^>]*>?/gm, "")
          .replace(/\s+/g, " ")
          .trim();
};

// Function to send password reset email
export const sendPasswordResetEmail = async (to, resetToken, platform) => {
     const subject = "Password Reset Request";

     const webUrl = `${platform === 'mobile' ? process.env.CLIENT_URL + "/(auth)/reset" : process.env.WEB_RESET}?token=${encodeURIComponent(resetToken)}`;

     // Rest of your HTML email template
     const html = `
          <!DOCTYPE html>
          <html>
               <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
               </head>
               <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333;">
                    <div style="margin-bottom: 20px;">
                         <h2 style="color: #2c3e50; margin-bottom: 20px;">Password Reset Request</h2>
                         <p>You requested to reset your password. Click the button below to proceed:</p>
                         
                         <div style="margin: 30px 0; text-align: center;">
                              <a href="${webUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; 
                                   border-radius: 4px; display: inline-block; font-weight: bold; font-size: 16px; margin: 10px 0;">
                                   Reset Password
                              </a>
                         </div>
                         
                         <p style="color: #7f8c8d; font-size: 13px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
                              <strong>Note:</strong> This link will expire in 10 minutes. If you didn't request a password reset, please ignore this email.
                         </p>
                    </div>
               </body>
          </html>
     `;

     const text = `Password Reset Request\n\n` +
          `You requested to reset your password. Please visit the following link to proceed:\n\n` +
          `${webUrl}\n\n` +
          `This link will expire in 10 minutes.\n` +
          `If you didn't request this, please ignore this email.`;

     await sendEmail({to, subject, html, text});
};