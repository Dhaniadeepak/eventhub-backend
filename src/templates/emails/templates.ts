import { env } from "../../config/env.js";

// Names come from user input, so escape them before putting them in HTML
const escapeHtml = (s: string): string =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const layout = (title: string, body: string): string => `
  <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px">
    <h2>${title}</h2>
    ${body}
    <p style="color:#888;font-size:12px;margin-top:32px">EventHub</p>
  </div>`;

export const verifyEmailTemplate = (name: string, token: string) => {
  const link = `${env.CLIENT_URL}/verify-email?token=${token}`;
  return {
    subject: "Verify your EventHub email",
    html: layout(
      "Welcome to EventHub",
      `<p>Hi ${escapeHtml(name)}, please verify your email.</p>
       <p><a href="${link}">Verify email</a></p>
       <p>Token (for API testing): <code>${token}</code></p>
       <p>This link expires in 24 hours.</p>`
    ),
  };
};

export const resetPasswordTemplate = (name: string, token: string) => {
  const link = `${env.CLIENT_URL}/reset-password?token=${token}`;
  return {
    subject: "Reset your EventHub password",
    html: layout(
      "Password reset",
      `<p>Hi ${escapeHtml(name)}, we got a request to reset your password.</p>
       <p><a href="${link}">Reset password</a></p>
       <p>Token (for API testing): <code>${token}</code></p>
       <p>This link expires in 15 minutes. If you didn't request this, ignore this email.</p>`
    ),
  };
};