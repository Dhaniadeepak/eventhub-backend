import nodemailer from "nodemailer";
import { env } from "./env.js";

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465, // true only for port 465, STARTTLS otherwise
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
});

export const verifyMailer = async (): Promise<void> => {
  try {
    await transporter.verify();
    console.log("Mailer ready");
  } catch (error) {
    console.error("Mailer not ready:", error instanceof Error ? error.message : error);
  }
};