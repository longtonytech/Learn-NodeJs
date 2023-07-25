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
    },
  },
  { timestamps: true }
);
export const ApplicationModel = mongoose.model(
  "applications",
  ApplicationSchema
);
