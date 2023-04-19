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
  id: 'Fewcha',
  name: 'Fewcha',
  iconUrl: 'https://fewcha.app/svgs/logo.svg',
  iconBackground: '#fff',
  downloadUrls: {
    android: 'https://chrome.google.com/webstore/detail/fewcha-move-wallet/ebfidpplhabeedpnhjnobghokpiiooljhttps://my-wallet/android',
    ios: 'https://chrome.google.com/webstore/detail/fewcha-move-wallet/ebfidpplhabeedpnhjnobghokpiioolj',
    qrCode: 'https://chrome.google.com/webstore/detail/fewcha-move-wallet/ebfidpplhabeedpnhjnobghokpiioolj',
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
          learnMoreUrl: 'https://fewcha.app/',
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