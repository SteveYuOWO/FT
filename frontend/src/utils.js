export const signIn = ({wallet, nearConfig}) => {
    wallet.requestSignIn(
      nearConfig.contractName,
      'NEAR NFT'
    );
  };

export const signOut = ({wallet}) => {
  wallet.signOut();
  window.location.replace(window.location.origin + window.location.pathname);
};