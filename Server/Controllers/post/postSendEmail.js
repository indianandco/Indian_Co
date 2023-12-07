const nodemailer = require('nodemailer');
const {sendEmailContact} = require('../../config/nodeMailer.config');

function sendEmail (req,res) {
    try {
        const ticket = req.body 
        sendEmailContact(ticket);
        res.status(200).send('¡Mensaje enviado con exito!');
    } catch (error) {
        console.log(error)
    }
}

module.exports = {sendEmail}

