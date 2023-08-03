import mongoose from "mongoose";

const ApplicationWalletSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
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
  { timestamps: true }
);
export const ApplicationWalletModel = mongoose.model(
  "applicationsWallets",
  ApplicationWalletSchema
);
