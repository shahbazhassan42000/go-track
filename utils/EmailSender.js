import nodemailer from "nodemailer";

export const sendEmail = (email, subject, text) => {
  // create a new promise object
  return new Promise((resolve, reject) => {
    // create the transporter object
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      service: process.env.EMAIL_SERVICE,
      secure: Boolean(process.env.EMAIL_SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    // send the email using the transporter
    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text
      },
      (err, info) => {
        // handle the callback
        if (err) {
          // if there is an error, reject the promise with the error
          console.log("Error while sending email");
          console.log(err);
          reject(err);
        } else {
          // if there is no error, resolve the promise with the info
          console.log("Email sent successfully");
          console.log(info);
          resolve(info);
        }
      }
    );
  });
};
