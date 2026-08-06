const mongoose = require("mongoose");

const emailVerificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    tokenHash: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    
    },
  },
  {
    timestamps: true,
  }
);

// Automatically delete expired verification documents
emailVerificationSchema.index(
  { expiresAt: 1 },
  {
    expireAfterSeconds: 0,
  }
);

const emailVerification = mongoose.model(
  "emailVerification",
  emailVerificationSchema
);

module.exports = emailVerification;