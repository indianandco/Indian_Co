const { nodemailer } = require('nodemailer');

//Configuracion:
const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: //Credenciales ,
        pass:  //Credenciales
    }
});

const newUserMailing = async (email, name) =>{
    await transport.sendMail({

        from: 'Indian Co <mail indian>',
        to: email,
        subject: 'Bienvenido!',
        html: ``
    });
};

/* const newUserMailing = async (email, name) =>{
    await transport.sendMail({

        from: 'Indian Co <mail indian>',
        to: email,
        subject: 'Bienvenido!',
        html: ``
    });
}; */

const shopOrderMailng = async (email, name, code, amount) =>{
    await transport.sendMail({

        from: 'Pedidos Indian Co <mail indian>',
        to: email,
        subject: 'Orden de compra',
        html: `<div>
                    <h1>Hola ${name}!! Te informamos, que tu orden de compra esta siendo procesada.</h1>\n
                    <p>Informacion de tu pedido:</p>\n
                    <ul>
                        <li>Codigo de la orden: ${code}</li>
                        <li>Total de la compra: $${amount}</li>
                    </ul>
                    \n
                    <p>Saludos, El equipo de Ecommerce Coderhouse.</p>
                </div>`,
        
    });
};

module.exports = {
    newUserMailing,
    shopOrderMailng
}