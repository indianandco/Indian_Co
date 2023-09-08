const nodemailer = require("nodemailer");
require('dotenv').config();

function generateProductList(products) {
  let productListHTML = "<ul>";
  products.forEach((product) => {
    productListHTML += `<li>
                          ${product.title} x${product.quantity}u $${product.price}<br/>
                          fragancia: ${products.fragance ?? '---'}
                        </li>`;
  });
  productListHTML += "</ul>";
  return productListHTML;
}

//Configuracion:
const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_CREDENTIALS,
  },
});

const shopOrderMailMPShipping = async (updatedTicket) => {
  const {
    preferenceId,
    comprobanteMercadoPago,
    paymentMethod,
    shop: { cart, total },
    user: {
      userInfo: { first_name },
      deliverInfo: { address, city, province, zipcode },
      notes,
    },
    email, // Agregamos email aquí para usarlo en el to: email,
  } = updatedTicket;

  await transport.sendMail({
    from: "VentasIndian&Co <testindian@gmail.com>",
    to: email,
    subject:  `Detalles Importantes para Completar tu Compra con ${paymentMethod} - Pedido`,
    html: `<!DOCTYPE html>
    <html>
    <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .cuadro{
        padding: 1rem;
        border: 1px solid black;
        border-radius: 6px;
      }
      h4 {
        margin-top: 15px;
      }
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
    </head>
    <body>
    <div class="container">
        <p>Estimado/a <b>${first_name}</b>,</p>
    
        <p>Es un placer saludarte en nombre de Indian & Co. Queremos agradecerte sinceramente por haber confiado en nosotros con tu reciente compra.</p>
        
        <p>Aquí están los detalles de tu pedido:</p>

        <div class="cuadro">
           <p><b>Número de Pedido: </b>000001</p>
            <p><b>Fecha de Compra: </b>FECHA</p>
            <p><b>Producto(s) Adquirido(s): </b> ${generateProductList(cart)}
            <p><b>Envio: </b> $2.000</p>
            <p><b>Precio Total:</b> ${total}</p>
            <p><b>Forma de Pago:</b>${paymentMethod}</p>
            <p><b>Notas del pedido: </b> ${notes ?? "---"} </p>
        </div>
        
        <p>Tan pronto como podamos, nos pondremos manos a la obra para preparar tu pedido y lo enviaremos a:</p>

        <div class="cuadro">
            <p>Direccion de entrega: ${address}</p>
            <p>Codigo Postal:${zipcode}</p>
            <p>Ciudad: ${city}</p>
            <p>Provincia: ${province}</p>
        </div>
        
        <p>Ante cualquier consulta, no dudes en ponerte en contacto con nuestro equipo de atención al cliente en <b>ventas@indianandco.com.ar</b> o <b><a href="https://wa.me/5491134424505">1134424505</a></b>. Estamos aquí para ayudarte en cada paso del proceso.</p>
        
        <p>Una vez más, te agradecemos por elegir Indian & Co. Esperamos que tu experiencia de compra sea excepcional y que el/los producto(s) seleccionado(s) cumpla(n) con todas tus expectativas.</p>
        
        <p>Saludos cordiales,</p>

        <p>Patricia y Pablo</p>
        <p>Indian & Co</p>
        <p>Correo Electrónico de Contacto: <b>ventas@indianandco.com.ar</b></p>
        <p>Teléfono de Contacto: <b><a href="https://wa.me/5491134424505">1134424505</a></b> </p>

    </div>
    </body>
    </html>`,
  });
};

const shopOrderMailMPMeetPoint =async (info) =>{
 
  await transport.sendMail({
    from: "VentasIndian&Co <testindian@gmail.com>",
    to: email,
    subject: `Detalles Importantes para Completar tu Compra con ${paymentMethod} - Pedido`,
    html: `<!DOCTYPE html>
    <html>
    <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .cuadro{
        padding: 1rem;
        border: 1px solid black;
        border-radius: 6px;
      }
      h4 {
        margin-top: 15px;
      }
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
    </head>
    <body>
    <div class="container">
        <p>Estimado/a <b>${first_name}</b>,</p>
    
        <p>Es un placer saludarte en nombre de Indian & Co. Queremos agradecerte sinceramente por haber confiado en nosotros con tu reciente compra.</p>
        
        <p>Aquí están los detalles de tu pedido:</p>

        <div class="cuadro">
           <p><b>Número de Pedido: </b> ${code}</p>
            <p><b>Fecha de Compra: </b> ${fecha}</p>
            <p><b>Producto(s) Adquirido(s): </b> ${generateProductList(cart)}
            <p><b>Envio: </b> ${envio}</p>
            <p><b>Precio Total:</b> ${total}</p>
            <p><b>Forma de Pago:</b> Transferencia Bancaria</p>
            <p><b>Notas del pedido: </b> ${notes ?? "---"} </p>
        </div>
      
        <p>Inmediatamente pondremos manos a la obra para preparar tu pedido y coordinar un punto de entrega.</p>
        
        <p>Ante cualquier consulta, no dudes en ponerte en contacto con nuestro equipo de atención al cliente en <b>ventas@indianandco.com.ar</b> o <b><a href="https://wa.me/5491134424505">1134424505</a></b>. Estamos aquí para ayudarte en cada paso del proceso.</p>
        
        <p>Una vez más, te agradecemos por elegir Indian & Co. Esperamos que tu experiencia de compra sea excepcional y que el/los producto(s) seleccionado(s) cumpla(n) con todas tus expectativas.</p>
        
        <p>Saludos cordiales,</p>

        <p>Patricia y Pablo</p>
        <p>Indian & Co</p>
        <p>Correo Electrónico de Contacto: <b>ventas@indianandco.com.ar</b></p>
        <p>Teléfono de Contacto: <b><a href="https://wa.me/5491134424505">1134424505</a></b> </p>

    </div>
    </body>
    </html>`,
  });
}
 
const shopOrderMailTransferWShipping = async (ticket) => {
  const {
    preferenceId,
    paymentMethod,
    shop: { cart, total },
    user: {
        userInfo: { first_name, last_name, email, phone },
        deliverInfo: { address, city, province, zipcode },
        notes
    },
    shippingOption
  } = info;

  await transport.sendMail({
    from: "VentasIndian&Co <testindian@gmail.com>",
    to: email,
    subject: `Detalles Importantes para Completar tu Compra con ${paymentMethod} - Pedido`,
    html: `<!DOCTYPE html>
        <html>
        <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .cuadro{
            padding: 1rem;
            border: 1px solid black;
            border-radius: 6px;
          }
          h4 {
            margin-top: 15px;
          }
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
        </head>
        <body>
        <div class="container">
            <p>Estimado/a <b>${first_name}</b>,</p>
        
            <p>Es un placer saludarte en nombre de Indian & Co. Queremos agradecerte sinceramente por haber confiado en nosotros con tu reciente compra.</p>
            
            <p>Aquí están los detalles de tu pedido:</p>

            <div class="cuadro">
               <p><b>Número de Pedido: </b> ${code}</p>
                <p><b>Fecha de Compra: </b> ${fecha}</p>
                <p><b>Producto(s) Adquirido(s): </b> ${generateProductList(cart)}
                <p><b>Envio: </b> ${envio}</p>
                <p><b>Precio Total:</b> ${total}</p>
                <p><b>Forma de Pago:</b> Transferencia Bancaria</p>
                <p><b>Notas del pedido: </b> ${notes ?? "---"} </p>
            </div>

            <p>Por favor, presta especial atención a los siguientes pasos para completar exitosamente tu compra:</p>
            
            <p>Para que podamos procesar tu pedido, necesitamos que realices una transferencia bancaria a la siguiente cuenta:</p>
            
            <div class="cuadro">
                <p><b>Banco:</b> Banco Galicia</p>
                <p><b>CBU:</b> 00700061-30004072286374</p>
                <p><b>ALIAS:</b> MARCO.SUMA.CUERO</p>
                <p><b>Titular de la Cuenta:</b> PATRICIA SUSANA LAHITOU</p>
                <p><b>Cuil:</b> 27-16495734-4</p>
                <p><b>Referencia:</b> Por favor, utiliza el número de pedido ${code} como referencia al realizar la transferencia.</p>
            </div>
          
            <p>Tan pronto como verifiquemos el pago en nuestra cuenta, nos pondremos manos a la obra para preparar tu pedido y lo enviaremos a:</p>

            <div class="cuadro">
                <p>Direccion de entrega: ${address}</p>
                <p>Codigo Postal:${zipcode}</p>
                <p>Ciudad: ${city}</p>
                <p>Provincia: ${province}</p>
            </div>

            
            <p>Ante cualquier consulta, no dudes en ponerte en contacto con nuestro equipo de atención al cliente en <b>ventas@indianandco.com.ar</b> o <b><a href="https://wa.me/5491134424505">1134424505</a></b>. Estamos aquí para ayudarte en cada paso del proceso.</p>
            
            <p>Una vez más, te agradecemos por elegir Indian & Co. Esperamos que tu experiencia de compra sea excepcional y que el/los producto(s) seleccionado(s) cumpla(n) con todas tus expectativas.</p>
            
            <p>Saludos cordiales,</p>

            <p>Patricia y Pablo</p>
            <p>Indian & Co</p>
            <p>Correo Electrónico de Contacto: <b>ventas@indianandco.com.ar</b></p>
            <p>Teléfono de Contacto: <b><a href="https://wa.me/5491134424505">1134424505</a></b> </p>

        </div>
        </body>
        </html>`,
  });
};

const shopOrderMailTransferMeetPoint = async (ticket) => {
 
  await transport.sendMail({
    from: "VentasIndian&Co <testindian@gmail.com>",
    to: email,
    subject: `Detalles Importantes para Completar tu Compra con ${paymentMethod} - Pedido`,
    html: `<!DOCTYPE html>
        <html>
        <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .cuadro{
            padding: 1rem;
            border: 1px solid black;
            border-radius: 6px;
          }
          h4 {
            margin-top: 15px;
          }
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
        </style>
        </head>
        <body>
        <div class="container">
            <p>Estimado/a <b>${first_name}</b>,</p>
        
            <p>Es un placer saludarte en nombre de Indian & Co. Queremos agradecerte sinceramente por haber confiado en nosotros con tu reciente compra.</p>
            
            <p>Aquí están los detalles de tu pedido:</p>

            <div class="cuadro">
               <p><b>Número de Pedido: </b> ${code}</p>
                <p><b>Fecha de Compra: </b> ${fecha}</p>
                <p><b>Producto(s) Adquirido(s): </b> ${generateProductList(cart)}
                <p><b>Envio: </b> ${envio}</p>
                <p><b>Precio Total:</b> ${total}</p>
                <p><b>Forma de Pago:</b> Transferencia Bancaria</p>
                <p><b>Notas del pedido: </b> ${notes ?? "---"} </p>
            </div>

            <p>Nos estaremos poniendo en contacto para coordinar el punto de encuetro dentro de las <b>48hs</b> de haber recibido el depósito</p>
            
            <p>Por favor, presta especial atención a los siguientes pasos para completar exitosamente tu compra:</p>
            
            <p>Para que podamos procesar tu pedido, necesitamos que realices una transferencia bancaria a la siguiente cuenta:</p>
            
            <div class="cuadro">
                <p><b>Banco:</b> Banco Galicia</p>
                <p><b>CBU:</b> 00700061-30004072286374</p>
                <p><b>ALIAS:</b> MARCO.SUMA.CUERO</p>
                <p><b>Titular de la Cuenta:</b> PATRICIA SUSANA LAHITOU</p>
                <p><b>Cuil:</b> 27-16495734-4</p>
                <p><b>Referencia:</b> Por favor, utiliza el número de pedido ${code} como referencia al realizar la transferencia.</p>
            </div>
          
            <p>Tan pronto como verifiquemos el pago en nuestra cuenta, nos pondremos manos a la obra para preparar tu pedido y coordinar un punto de entrega.</p>
            
            <p>Ante cualquier consulta, no dudes en ponerte en contacto con nuestro equipo de atención al cliente en <b>ventas@indianandco.com.ar</b> o <b><a href="https://wa.me/5491134424505">1134424505</a></b>. Estamos aquí para ayudarte en cada paso del proceso.</p>
            
            <p>Una vez más, te agradecemos por elegir Indian & Co. Esperamos que tu experiencia de compra sea excepcional y que el/los producto(s) seleccionado(s) cumpla(n) con todas tus expectativas.</p>
            
            <p>Saludos cordiales,</p>

            <p>Patricia y Pablo</p>
            <p>Indian & Co</p>
            <p>Correo Electrónico de Contacto: <b>ventas@indianandco.com.ar</b></p>
            <p>Teléfono de Contacto: <b><a href="https://wa.me/5491134424505">1134424505</a></b> </p>

        </div>
        </body>
        </html>`,
});
};

module.exports = {
  //newUserMailing,
  shopOrderMailMPMeetPoint,
  shopOrderMailMPShipping,
  shopOrderMailTransferWShipping,
  shopOrderMailTransferMeetPoint
};
