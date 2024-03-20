const nodemailer = require('nodemailer')
require('dotenv').config()

module.exports = {
    async sendVerificationMail(email, code) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                },
            })
    
            transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: 'Код для подтверждения почты',
                html: 
                `
                    <h1>Twitter Clone App</h1>
                    <hr/>
                    <h4>Код подтверждения:</h4>
                    <h3>${code}</h3>
                `
            })
        } catch(e) {
            console.error(e)
        }
    }
}