const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const Sendgrid = {
    async sendTest(test) {
        const msg = {
            to: 'test@example.com', // Change to your recipient
            from: process.env.SENDGRID_VERIFIED_SENDER, // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail.send(msg).then(() => {
            console.log('Email sent')
            return ('Email sent')
            })
            .catch((error) => {
            console.error(error)
            return (error)
            })
    }
};

module.exports = Sendgrid;
