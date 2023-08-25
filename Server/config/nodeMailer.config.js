const nodemailer = require("nodemailer");

function generateProductList(products) {
  let productListHTML = "<ul>";
  products.forEach((product) => {
    productListHTML += `<li>${product.title} x${product.quantity}u $${product.price}</li>`;
  });
  productListHTML += "</ul>";
  return productListHTML;
}

//Configuracion:
const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "federicoepaglia@gmail.com",
    pass: "apasbkxnpzxruenz",
  },
});

const shopOrderMailMPShipping = async (email, name, code, amount) => {
  await transport.sendMail({
    from: "Pedidos Indian Co <testindian@gmail.com>",
    to: email,
    subject: "Orden de compra",
    html: `<div>
                    <h2>Hola ${name}!! Gracias por tu compra.</h2>\n
                    <p>Informacion de tu pedido:</p>\n
                    <ul>
                        <li>Codigo de la orden: ${code}</li>
                        <li>Total de la compra: <b>$${amount}</b></li>
                    </ul>
                    \n
                    <p>Saludos, El equipo de Indian and Co.</p>
                </div>`,
  });
};

const shopOrderMailMPMeetPoint =async () =>{
  await transport.sendMail({
    from: "Pedidos Indian Co <testindian@gmail.com>",
    to: email,
    subject: "Orden de compra",
    html: `<div>
                    <h2>Hola ${name}!! Gracias por tu compra.</h2>\n
                    <p>Informacion de tu pedido:</p>\n
                    <ul>
                        <li>Codigo de la orden: ${code}</li>
                        <li>Total de la compra: <b>$${amount}</b></li>
                    </ul>
                    \n
                    <p>Saludos, El equipo de Indian and Co.</p>
                </div>`,
  });
}
 
const shopOrderMailTransferWShipping = async (email,name, code, amount, cart, shippingInfo) => {
  await transport.sendMail({
    from: "VentasIndian&Co <testindian@gmail.com>",
    to: email,
    subject: `Detalles Importantes para Completar tu Compra con Transferencia Bancaria - Pedido ${code}`,
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
            <p>Estimado/a <b>${name}</b>,</p>
        
            <p>Es un placer saludarte en nombre de Indian & Co. Queremos agradecerte sinceramente por haber confiado en nosotros con tu reciente compra.</p>
            
            <p>Aquí están los detalles de tu pedido:</p>

            <div class="cuadro">
               <p><b>Número de Pedido: </b> ${code}</p>
                <p><b>Fecha de Compra: </b> ${fecha}</p>
                <p><b>Producto(s) Adquirido(s): </b> ${generateProductList(cart)}
                <p><b>Envio: </b> ${envio}</p>
                <p><b>Precio Total:</b> ${amount}</p>
                <p><b>Forma de Pago:</b> Transferencia Bancaria</p>
                <p><b>Notas del pedido: </b> ${notas-pedido} </p>
            </div>

            <p>Datos de envio: </p>

            <div class="cuadro">
              <p><b>Direccion de entrega: </b> ${direccion} </p>
              <p><b>Detalle: </b> ${direccion-apartado} </p>
              <p><b>Ciudad: </b> ${ciudad}</p>
              <p><b>Código Postal: </b> ${zipcode} </p>
              <p><b>Provincia: </b> ${provincia} </p>
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
                <p>Direccion de entrega: ${shippingInfo.address}</p>
                <p>Codigo Postal:${shippingInfo.zipcode}</p>
                <p>Ciudad: ${shippingInfo.city}</p>
                <p>Provincia: ${shippingInfo.province}</p>
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

const shopOrderMailTransferMeetPoint = async (email,name,code,amount,  cart,shippingInfo) => {
  await transport.sendMail({
    from: "VentasIndian&Co <testindian@gmail.com>",
    to: email,
    subject: `Detalles Importantes para Completar tu Compra con Transferencia Bancaria - Pedido ${code}`,
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
            <p>Estimado/a <b>${name}</b>,</p>
        
            <p>Es un placer saludarte en nombre de Indian & Co. Queremos agradecerte sinceramente por haber confiado en nosotros con tu reciente compra.</p>
            
            <p>Aquí están los detalles de tu pedido:</p>

            <div class="cuadro">
               <p><b>Número de Pedido: </b> ${code}</p>
                <p><b>Fecha de Compra: </b> ${fecha}</p>
                <p><b>Producto(s) Adquirido(s): </b> ${generateProductList(cart)}
                <p><b>Envio: </b> ${envio}</p>
                <p><b>Precio Total:</b> ${amount}</p>
                <p><b>Forma de Pago:</b> Transferencia Bancaria</p>
                <p><b>Notas del pedido: </b> ${notas-pedido} </p>
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
          
            <p>Tan pronto como verifiquemos el pago en nuestra cuenta, nos pondremos manos a la obra para preparar tu pedido y lo enviaremos a:</p>

            <div class="cuadro">
                <p>Direccion de entrega: ${shippingInfo.address}</p>
                <p>Codigo Postal:${shippingInfo.zipcode}</p>
                <p>Ciudad: ${shippingInfo.city}</p>
                <p>Provincia: ${shippingInfo.province}</p>
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

module.exports = {
  //newUserMailing,
  shopOrderMailMPMeetPoint,
  shopOrderMailMPShipping,
  shopOrderMailTransferWShipping,
  shopOrderMailTransferMeetPoint
};
