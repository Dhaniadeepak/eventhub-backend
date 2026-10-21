import { transporter } from "../config/mailer.js";
import { env } from "../config/env.js";
import { verifyEmailTemplate, resetPasswordTemplate } from "../templates/emails/templates.js";

const send = async (to: string, subject: string, html: string): Promise<void> => {
  try {
    await transporter.sendMail({ from: env.EMAIL_FROM, to, subject, html });
  } catch (error) {
    // Never let an email failure break the main request
    console.error("Email send failed:", error instanceof Error ? error.message : error);
  }
};

export const sendVerificationEmail = (to: string, name: string, token: string) => {
  const { subject, html } = verifyEmailTemplate(name, token);
  return send(to, subject, html);
};

export const sendResetPasswordEmail = (to: string, name: string, token: string) => {
  const { subject, html } = resetPasswordTemplate(name, token);
  return send(to, subject, html);
};