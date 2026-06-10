import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/db";
import StudentPortfolio from "@/models/StudentPortfolio";
import Lead from "@/models/Lead";

export async function POST(req) {
  try {
    const data = await req.json();
    const fullName = String(data.fullName || "").trim();
    const email = String(data.email || "").trim().toLowerCase();
    const phone = String(data.phone || "").trim();
    const socialLink = String(data.socialLink || "").trim();
    const university = String(data.university || "").trim();
    const department = String(data.department || "").trim();
    const universityId = String(data.universityId || "").trim();

    // 1. Validation
    if (!fullName || !email || !phone || !university || !department) {
      return NextResponse.json(
        { error: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    await dbConnect();

    // 2. Check for duplicate claims
    const existing = await StudentPortfolio.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { 
          error: "This email has already registered for a free portfolio.", 
          hash: existing.hash 
        },
        { status: 409 }
      );
    }

    // 3. Generate secure hash key
    const hash = crypto.randomUUID();

    // 4. Create Student Portfolio record
    const studentPortfolio = await StudentPortfolio.create({
      hash,
      fullName,
      email,
      phone,
      socialLink,
      university,
      department,
      universityId,
    });

    // 5. Create Lead entry to show in Easin's admin panel
    await Lead.create({
      fullName,
      email,
      whatsapp: phone,
      company: university,
      address: department,
      source: "student_promo",
      projectTitle: "Free Student Portfolio",
      services: ["Landing Page", "Free Student Portfolio"],
      budget: "Free (Student Promo)",
      details: `Student registered via leaflet university campaign.\nUniversity ID details: ${universityId}\nSocial Profile: ${socialLink || "N/A"}\nSecret Dashboard: /students/portal/${hash}`,
      status: "new",
    });

    // 6. Nodemailer transporter configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 7. Get request origin (URL basis)
    const origin = new URL(req.url).origin;
    const dashboardLink = `${origin}/students/portal/${hash}`;

    // 8. Welcome Email to Student
    const studentMailOptions = {
      from: `"ScaleUp Web Student Accelerator" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Claim your Free Portfolio Website, ${fullName}! 🚀`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 30px; border-radius: 16px; background-color: #ffffff;">
          <h2 style="color: #3b82f6; margin-top: 0;">Congratulations ${fullName}! 🎉</h2>
          <p>We received your claim for a <strong>Free One-Page Portfolio Website</strong> under our University Student Campaign.</p>
          
          <p>We have created your personal developer dashboard. You can customize your bio, skills, and projects, select theme colors, and view your live preview anytime using your secret link:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${dashboardLink}" style="display: inline-block; padding: 15px 30px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);">
              Customize My Portfolio
            </a>
          </div>

          <p style="font-size: 13px; color: #ef4444; font-weight: bold; text-align: center;">
            ⚠️ Keep this link secure. Anyone with this link can edit your portfolio!
          </p>

          <p>Once you customize and save your details inside the dashboard, our engineering team will finalize the hand-crafted code, deploy your portfolio, and follow up with you on WhatsApp at <strong>${phone}</strong>.</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;" />
          
          <div style="text-align: center;">
            <p style="font-size: 12px; color: #999;">&copy; ${new Date().getFullYear()} ScaleUp Web. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // 9. Alert Email to Admin (Easin Arafat)
    const adminMailOptions = {
      from: `"ScaleUp Promo Alerts" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `🎓 New Student Portfolio Claimed: ${fullName}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2 style="color: #10b981;">New Student Registration</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>University:</strong> ${university}</p>
          <p><strong>Department:</strong> ${department}</p>
          <p><strong>ID Details:</strong> ${universityId || "N/A"}</p>
          <p><strong>Social Link:</strong> <a href="${socialLink}">${socialLink || "N/A"}</a></p>
          <p><strong>Edit Link:</strong> <a href="${dashboardLink}">Open Customizer Portal</a></p>
        </div>
      `,
    };

    // 10. Send Emails concurrently
    await Promise.all([
      transporter.sendMail(studentMailOptions),
      transporter.sendMail(adminMailOptions),
    ]).catch((err) => {
      console.error("Nodemailer failed to send student signup emails:", err);
    });

    return NextResponse.json({ success: true, hash }, { status: 201 });
  } catch (error) {
    console.error("Student signup error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
