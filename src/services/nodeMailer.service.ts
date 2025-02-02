import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from '@/config';
import nodemailer from 'nodemailer';

// Email service using nodemailer
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(options: { to: string; subject: string; text?: string; html?: string }): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: SMTP_USER,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });
    } catch (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  // Verify SMTP connection
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      throw new Error(`SMTP connection failed: ${error.message}`);
    }
  }
}
