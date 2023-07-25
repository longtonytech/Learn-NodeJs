export const formatEditApplicationWallet = (fields: string[], body: any) => {
  let editApplicationWallet: any = {};
  fields.map((field) => {
    if (body[field]) {
      return (editApplicationWallet[field] = body[field]);
    }
  });
  return editApplicationWallet;
};

export const formatCreateApplicationWallet = (body: any) => ({
  userId: body.userId,
  walletId: body.walletId,
  applicationId: body.applicationId,
});
