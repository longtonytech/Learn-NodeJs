import mongoose from "mongoose";

const ApplicationWalletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallets",
      required: true,
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applications",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
export const ApplicationWalletModel = mongoose.model(
  "ApplicationWallets",
  ApplicationWalletSchema
);
