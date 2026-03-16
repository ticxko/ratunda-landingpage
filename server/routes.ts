import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "127.0.0.1",
  port: 25,
  secure: false,
  tls: { rejectUnauthorized: false },
});

const SERVICE_LABELS: Record<string, string> = {
  "Atap Bocor": "Atap Bocor (Leaky Roof)",
  "Dinding Lembab": "Dinding Lembab (Damp Walls)",
  "Tarik Listrik": "Tarik Listrik (Electrical)",
  "Renovasi Dapur": "Renovasi Dapur (Kitchen)",
  "Renovasi Kamar Mandi": "Renovasi Kamar Mandi (Bathroom)",
  "Pasang Kanopi": "Pasang Kanopi (Canopy)",
  "Pembuatan Furniture": "Pembuatan Furniture",
  "Pasang AC": "Pasang AC (AC Installation)",
  "Cor Dak Beton": "Cor Dak Beton (Concrete)",
  "Lainnya": "Lainnya (Other)",
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);

      // Send email notification to hello@ratunda.id
      const serviceLabel = SERVICE_LABELS[input.serviceType] || input.serviceType;
      const htmlBody = `
        <h2>Inquiry Baru dari Website Ratunda</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:6px 12px;font-weight:bold;">Nama</td><td style="padding:6px 12px;">${escapeHtml(input.name)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Telepon/WA</td><td style="padding:6px 12px;">${escapeHtml(input.phone)}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;">Layanan</td><td style="padding:6px 12px;">${escapeHtml(serviceLabel)}</td></tr>
          ${input.email ? `<tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;">${escapeHtml(input.email)}</td></tr>` : ""}
          ${input.message ? `<tr><td style="padding:6px 12px;font-weight:bold;">Pesan</td><td style="padding:6px 12px;">${escapeHtml(input.message)}</td></tr>` : ""}
        </table>
        <p style="margin-top:16px;color:#666;font-size:13px;">Dikirim dari formulir kontak ratunda.id</p>
      `;

      transporter.sendMail({
        from: '"Ratunda Website" <noreply@ratunda.id>',
        to: "hello@ratunda.id",
        subject: `[Inquiry] ${input.name} — ${serviceLabel}`,
        html: htmlBody,
      }).catch((err) => {
        console.error("Failed to send inquiry email:", err);
      });

      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
