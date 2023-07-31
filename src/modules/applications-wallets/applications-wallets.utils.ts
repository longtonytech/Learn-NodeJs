export const formatEditApplicationWallet = (fields: string[], body: any) => {
  let editApplicationWallet: any = {};
  fields.map((field) => {
    if (body[field]) {
      return (editApplicationWallet[field] = body[field]);
    }
  });
  return editApplicationWallet;
};

export const formatCreateApplicationWallet = (req: any) => ({
  name: req.body.name || "emptyName",
  userId: req.userId,
  walletId: req.body.walletId,
  applicationId: req.body.applicationId,
});
