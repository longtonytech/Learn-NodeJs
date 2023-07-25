import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    walletAddress: {
      type: "string",
      required: true,
    },
    amountOfMoney: {
      type: "string",
    },
    privateKey: {
      type: "string",
    },
  },
  { timestamps: true }
);
export const WalletModel = mongoose.model("wallets", WalletSchema);
