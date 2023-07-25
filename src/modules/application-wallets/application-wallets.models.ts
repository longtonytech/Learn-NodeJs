import mongoose from "mongoose";

const ApplicationWalletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wallets",
      required: true,
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "applications",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
export const ApplicationWalletModel = mongoose.model(
  "applicationWallets",
  ApplicationWalletSchema
);
