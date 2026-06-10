import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import StudentPortfolio from "@/models/StudentPortfolio";

// GET current student portfolio configurations
export async function GET(req, { params }) {
  try {
    const { hash } = await params;
    
    await dbConnect();
    const portfolio = await StudentPortfolio.findOne({ hash });
    
    if (!portfolio) {
      return NextResponse.json(
        { error: "Student portfolio portal not found." },
        { status: 404 }
      );
    }
    
    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("GET student portfolio error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT updated student portfolio configurations
export async function PUT(req, { params }) {
  try {
    const { hash } = await params;
    const data = await req.json();
    
    await dbConnect();
    const portfolio = await StudentPortfolio.findOne({ hash });
    
    if (!portfolio) {
      return NextResponse.json(
        { error: "Student portfolio portal not found." },
        { status: 404 }
      );
    }

    // Update allowable customization fields
    if (typeof data.designation === "string") portfolio.designation = data.designation.trim();
    if (typeof data.bio === "string") portfolio.bio = data.bio.trim();
    if (typeof data.accentColor === "string") portfolio.accentColor = data.accentColor.trim();
    if (typeof data.githubLink === "string") portfolio.githubLink = data.githubLink.trim();
    if (typeof data.linkedinLink === "string") portfolio.linkedinLink = data.linkedinLink.trim();
    if (typeof data.resumeLink === "string") portfolio.resumeLink = data.resumeLink.trim();
    if (typeof data.avatarUrl === "string") portfolio.avatarUrl = data.avatarUrl.trim();
    
    if (Array.isArray(data.skills)) {
      portfolio.skills = data.skills.map(skill => String(skill).trim()).filter(Boolean);
    }
    
    if (Array.isArray(data.projects)) {
      portfolio.projects = data.projects.map(project => ({
        title: String(project.title || "My Project").trim(),
        description: String(project.description || "").trim(),
        link: String(project.link || "").trim(),
        image: String(project.image || "").trim()
      }));
    }
    
    if (data.status && ["draft", "submitted", "published"].includes(data.status)) {
      portfolio.status = data.status;
    }

    await portfolio.save();

    return NextResponse.json({ success: true, portfolio });
  } catch (error) {
    console.error("PUT student portfolio error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
