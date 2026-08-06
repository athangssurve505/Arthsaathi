const mongoose = require("mongoose");


const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
     
    },

    // Store the HASH of the refresh token, not the raw token
    refreshTokenHash: {
      type: String,
      unique: true,
      default: null,
    },

    userAgent: {
      type: String,
      default: "",
    },

    ipAddress: {
      type: String,
      default: "",
    },

    isRevoked: {
      type: Boolean,
      default: false,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    lastUsedAt:{
      type:Date,
      required:true
    }

  },
  {
    timestamps: true,
  }
);

module.exports =  mongoose.model("Session", sessionSchema);