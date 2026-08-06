const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
});

async function sendEmail({
  to,
  subject,
  html,
}) {
  try {
    await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_FROM,
        name: "ArthSaathi",
      },

      to: [
        {
          email: to,
        },
      ],

      subject,

      htmlContent: html,
    });

    console.log("Email Sent");
  } catch (err) {
    console.log(err);
  }
}

module.exports = sendEmail;