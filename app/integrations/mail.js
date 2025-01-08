const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Sendgrid = {
  async sendTest(recipient, message) {
    const msg = {
      to: recipient, // Recipient email
      from: "thibault@propeller.services", // Verified sender
      subject: "New ticket came out of a meeting",
      text: message, // Plain text content
      html: `<strong>${message}</strong>`, // HTML content
    };

    try {
      await sgMail.send(msg);
      console.log(`Email sent to ${recipient}`);
      return { recipient, status: "success", message: "Email sent successfully" };
    } catch (error) {
      console.error(`Failed to send email to ${recipient}:`, error.message);
      return { recipient, status: "error", message: error.message };
    }
  },
};

module.exports = Sendgrid;