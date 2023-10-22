import nodemailer from "nodemailer";

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 1025, // maildev default port
  secure: false, // true for 465, false for other ports
});

const sendMail = async (to: string, filePath: string) => {
  const info = await transporter.sendMail({
    from: "sender@example.com", // sender address
    to, // list of receivers
    subject: "INVOICE", // Subject line
    text: "Please find  your  invoice in attachments", // plain text body
    attachments: [
      {
        filename: "invoice.pdf",
        path: filePath,
        contentType: "application/pdf",
      },
    ],
  });

  return info.messageId;
};

export default sendMail;
