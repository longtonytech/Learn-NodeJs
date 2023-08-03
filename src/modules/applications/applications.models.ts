import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    deviceId: {
      type: "string",
    },
    name: {
      type: "string",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
ApplicationSchema.index({ "$**": "text" });
export const ApplicationModel = mongoose.model(
  "applications",
  ApplicationSchema
);
