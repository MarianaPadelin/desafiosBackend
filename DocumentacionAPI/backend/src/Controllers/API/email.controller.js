// import nodemailer from "nodemailer";
// import config from "../../config/config.js";

// // import ticketDao from "../../Services/DAOS/mongoDB/ticket.dao.js";
// // import __dirname from "../../dirname.js";
// import ticketRepository from "../../Services/Repository/ticket.repository.js";
// import __dirname from "../../utils/nodemailer.js";

// //falta escribir las funciones como middleware

// //NODEMAILER:
// // configuracion de transport
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   port: 587,
//   auth: {
//     user: config.emailAcount,
//     pass: config.appPassword,
//   },
// });

// // Verificamos conexion con gmail
// transporter.verify(function (error, success) {
//   if (error) {
//     req.logger.error(`Error de verificación ${error}`);
//   } else {
//     req.logger.info("Server is ready to take our messages");
//   }
// });

// export const sendEmail = async (id, email) => {
//   try {
//     // const data = await ticketDao.findOneTicket(id);
//     const data = await ticketRepository.getById(id)
//     // console.log(data);
//     logger.info(data);

//     let result = transporter.sendMail({
//       from: "Coder Backend PreEntrega - " + config.emailAcount,
//       to: email,
//       subject: "Comprobante Ticket de compra",
//       html: `<div><h1> Ticket generado: ${data} </h1></div>`,
//       attachments: [],
//     });
//     logger.info(`Email: ${email}`);
//     // console.log(email);
//     return result;
//   } catch (error) {
//     logger.error(error);
//     return error;
//   }
// };

//Más adelante adjuntar el ticket además de mandarlo en el cuerpo:

// const mailOptionsWithAttachments = {
//     from: "Coder Test - " + config.gmailAccount,
//     to: `${config.gmailAccount};enzozanino2000@gmail.com; leo1987@yopmail.com`,
//     subject: "Correo de prueba CoderHouse Pkrogramacion BackEnmd clase30",
//     html: `<div>
//                 <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
//                 <p>Ahora usando imagenes: </p>
//                 <img src="cid:meme"/>
//             </div>`,
//     attachments: [
//         {
//             filename: 'Meme de programacion',
//             path: __dirname + '/public/images/meme.png',
//             cid: 'meme'
//         }
//     ]
// }

// export const sendEmailWithAttachments = (req, res) => {
//     try {
//         let result = transporter.sendMail(mailOptionsWithAttachments, (error, info) => {
//             if (error) {
//                 console.log(error);
//                 res.status(400).send({ message: "Error", payload: error });
//             }
//             console.log('Message sent: %s', info.messageId);
//             res.send({ message: "Success", payload: info })
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
//     }
// }


/*=============================================
=                   Password Reset            =
=============================================*/

// const mailOptionsToReset = {
//     from: config.gmailAccount,
//     // to: config.gmailAccount,
//     subject: "Reset password",
// }

// const tempDbMails = {}

// export const sendEmailToResetPassword = (req, res) => {
//     try {
//         const { email } = req.body
//         if (!email) {
//             return res.status(400).send('Email not privided')
//         }
//         // Generamos un token/idrandom
//         const token = v4();
//         const link = `http://localhost:9090/api/email/reset-password/${token}`

//         // Store the email and its expiration time
//         //  60 * 60 * 1000: Esto representa una hora en milisegundos. Multiplicando 60 (segundos) por 60 (minutos) y luego por 1000 (milisegundos), obtenemos el equivalente a una hora en milisegundos.
//         tempDbMails[token] = {
//             email,
//             expirationTime: new Date(Date.now() + 1 * 60 * 1000)
//         }
//         console.log(tempDbMails);


//         mailOptionsToReset.to = email
//         mailOptionsToReset.html = `To reset your password, click on the following link: <a href="${link}"> Reset Password</a>`

//         transporter.sendMail(mailOptionsToReset, (error, info) => {
//             if (error) {
//                 console.log(error);
//                 res.status(500).send({ message: "Error", payload: error });
//             }
//             console.log('Message sent: %s', info.messageId);
//             res.send({ message: "Success", payload: info })
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
//     }
// }



// export const resetPassword = (req, res) => {
//     const token = req.params.token;
//     const email = tempDbMails[token];
//     console.log(email);

//     const now = new Date();
//     const expirationTime = email?.expirationTime
//     console.log(expirationTime);

//     if (now > expirationTime || !expirationTime) {
//         delete tempDbMails[token]
//         console.log('Expiration time completed');
//         return res.redirect('/send-email-to-reset')
//     }

//     // Hacemos toda la logica de Update de Password contra la DB
//     res.send('<h1>Start Reset Password Porcess</h1>')

// }