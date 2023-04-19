import {
  Chain,
  Wallet,
  getWalletConnectConnector,
} from '@rainbow-me/rainbowkit';
export interface MyWalletOptions {
  projectId: string;
  chains: Chain[];
}
export const fewcha = ({
  chains,
  projectId,
}: MyWalletOptions): Wallet => ({
  id: 'Martian',
  name: 'Martian',
  iconUrl: 'https://avatars.githubusercontent.com/u/103241191?s=200&v=4',
  iconBackground: '#fff',
  downloadUrls: {
    android: 'https://chrome.google.com/webstore/detail/martian-aptos-wallet/efbglgofoippbgcjepnhiblaibcnclgk',
    ios: 'https://chrome.google.com/webstore/detail/martian-aptos-wallet/efbglgofoippbgcjepnhiblaibcnclgk',
    qrCode: 'https://chrome.google.com/webstore/detail/martian-aptos-wallet/efbglgofoippbgcjepnhiblaibcnclgk',
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({ projectId, chains });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const { uri } = (await connector.getProvider()).connector;
          return uri;
        },
      },
      qrCode: {
        getUri: async () =>
          (await connector.getProvider()).connector.uri,
        instructions: {
          learnMoreUrl: 'https://martianwallet.xyz/',
          steps: [
            {
              description:
                'We recommend putting My Wallet on your home screen for faster access to your wallet.',
              step: 'install',
              title: 'Open the My Wallet app',
            },
            {
              description:
                'After you scan, a connection prompt will appear for you to connect your wallet.',
              step: 'scan',
              title: 'Tap the scan button',
            },
          ],
        },
      },
    };
  },
});