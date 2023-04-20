import React from 'react'
import { useAccount, useConnect } from 'wagmi';

import { Button, Card, Col, Modal, Row } from 'antd';
import { useState } from 'react';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import styles from '../../styles/Home.module.css';
import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {
  injectedWallet,
  metaMaskWallet,
  bitskiWallet,
  imTokenWallet,
  okxWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
export interface walletProps {
  callList: {
    method: string,
    result: any
  }[],
  setcallList: Function,
  label: string,
  list: any[]
}
const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    goerli,
  ],
  [publicProvider()]
);

// const { connectors } = getDefaultWallets({
//   appName: 'web3 test',
//   projectId: '86a06f8526c8d8b550b13c46a013cb91',
//   chains,
// });
const projectId = '86a06f8526c8d8b550b13c46a013cb91'
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      // rainbowWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
      // coinbaseWallet({ chains, appName: 'My RainbowKit App' }),
      bitskiWallet({ chains }),
      // imTokenWallet({ projectId, chains }),
      okxWallet({ projectId, chains }),
      // trustWallet({ projectId, chains }),
    ],
  }
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
const EthConnect = (props: walletProps) => {
  const { callList, setcallList, label, list } = props;
  const { address: ethAccount, isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()

  const ethRequestFun = (item: any) => {
    console.log(isConnected)
    if (isConnected) {
      const provider = window.ethereum || (window as any).okexchain
      provider?.request({
        method: item.method,
        params: Array.isArray(item.params) ? item.params : item.params(ethAccount)
      }).then((res: any) => {
        // if (item.method == 'eth_requestAccounts') {
        //   setaccount(res[0])
        // }
        callList.push({
          method: item.method,
          result: res || '无内容返回'
        })
        setcallList([...callList])
      }).catch((err: { message: any; }) => {
        callList.push({
          method: item.method,
          result: JSON.stringify(err.message)
        })
        setcallList([...callList])
        console.log(err)
      })
    } else {
      openConnectModal?.()
    }
  }
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Card title={label} extra={<ConnectButton accountStatus="address" />}>
          <Row gutter={10}>
            {list.map((item, i) => <Col span={12} key={i}>
              <Button
                style={{ width: '100%', marginBottom: 10 }}
                type="primary"
                onClick={() => ethRequestFun(item)}>
                <span className={styles.connectButton}>{item.method}</span>
              </Button>
            </Col>)}
          </Row>
        </Card>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default EthConnect