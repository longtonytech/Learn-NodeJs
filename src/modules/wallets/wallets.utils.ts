export const formatEditWallet = (fields: string[], body: any) => {
  let editWallet: any = {};
  fields.map((field) => {
    if (body[field]) {
      return (editWallet[field] = body[field]);
    }
  });
  return editWallet;
};

export const formatCreateWallet = (body: any) => ({
  userId: body.userId,
  walletAddress: body.walletAddress,
  amountOfMoney: body.amountOfMoney || "emptyMoney",
  privateKey: body.privateKey || "emptyKey",
});
