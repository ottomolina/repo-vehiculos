"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

interface IArgs {
  correo: string;
  asunto: string;
  html: string;
  fnOk: (info: any) => void;
  fnError: (error: any) => void;
}

const enviar_mail = (args: IArgs) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  let mail_options = {
    from: `"MANTENIMIENTO VEHICULOS" <${process.env.MAIL_USER}>`,
    to: args.correo,
    subject: args.asunto,
    html: args.html,
  };
  transporter.sendMail(mail_options, (error: any, info: any) => {
    if (error) {
      args.fnError(error);
    } else {
      args.fnOk(info);
    }
  });
};

export const MailUtils = { enviar_mail };
