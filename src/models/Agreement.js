import mongoose from "mongoose";

const AgreementSchema = new mongoose.Schema({
  clientName: String,
  clientEmail: String,
  clientPhone: String,
  clientWhatsApp: String,
  clientCompany: String,
  clientAddress: String,
  preferredContact: String,
  projectTitle: {
    type: String,
    required: true,
  },
  projectDescription: String,
  services: [String],
  price: {
    type: Number,
    required: true,
  },
  timeline: String,
  status: {
    type: String,
    enum: ["pending_signature", "signed"],
    default: "pending_signature",
  },
  signatureData: String, // Client Base64 signature
  providerSignatureData: String, // Provider Base64 signature 
  providerName: { type: String, default: "Easin Arafat" },
  signedAt: Date,
  uniqueHash: {
    type: String,
    unique: true,
    required: true,
  },
  templateType: {
    type: String,
    enum: ["normal", "premium", "discount"],
    default: "normal",
  },
  advancePayment: {
    type: Number,
    default: 0,
  },
  includeDomainHosting: {
    type: Boolean,
    default: false,
  },
  domainName: {
    type: String,
    default: "",
  },
  hostingPackage: {
    type: String,
    default: "",
  },
  domainHostingCost: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Use standard registration pattern for production
export default mongoose.models.Agreement || mongoose.model("Agreement", AgreementSchema);
