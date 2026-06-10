import mongoose from "mongoose";

const StudentProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "My Awesome Project",
  },
  description: {
    type: String,
    default: "A brief description of my project and what technologies I used to build it.",
  },
  link: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
}, { _id: true });

const StudentPortfolioSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  socialLink: {
    type: String,
    default: "",
  },
  university: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  universityId: {
    type: String,
    default: "",
  },
  designation: {
    type: String,
    default: "Student & Developer",
  },
  bio: {
    type: String,
    default: "A passionate student from Bangladesh building digital solutions and exploring technology.",
  },
  accentColor: {
    type: String,
    default: "#3b82f6",
  },
  skills: {
    type: [String],
    default: ["HTML", "CSS", "JavaScript", "React"],
  },
  projects: {
    type: [StudentProjectSchema],
    default: [
      {
        title: "My First Project",
        description: "An interactive website built using HTML, CSS, and JavaScript with modern layouts.",
        link: "https://github.com",
        image: "",
      }
    ],
  },
  status: {
    type: String,
    enum: ["draft", "submitted", "published"],
    default: "draft",
  },
}, { timestamps: true });

export default mongoose.models.StudentPortfolio || mongoose.model("StudentPortfolio", StudentPortfolioSchema);
