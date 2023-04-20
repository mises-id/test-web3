import React from 'react'

import { Button, Card, Col, Row } from 'antd';
import styles from '../../styles/Home.module.css';
import { walletProps } from '../Eth';
import { WalletProvider, useAccountBalance, useWallet } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { ConnectButton } from '@suiet/wallet-kit';
import { TransactionBlock, fromB64 } from '@mysten/sui.js'

const sampleNft = new Map([
  ['sui:devnet', '0x37b32a726c348b9198ffc22f63a97cb36c01f257258af020cecea8a82575dd56::nft::mint'],
  ['sui:testnet', '0x57c53166c2b04c1f1fc93105b39b6266cb1eccbe654f5d2fc89d5b44524b11fd::nft::mint'],
])
const SuiConnect = (props: walletProps) => {
  const { callList, setcallList, label, list } = props;
  const { signAndExecuteTransactionBlock, signMessage, verifySignedMessage, ...wallet } = useWallet()
  // const { balance } = useAccountBalance();

  const requestObj: any = {
    async signAndExecuteTransactionBlock() {
      try {
        const tx = new TransactionBlock()
        tx.moveCall({
          target: sampleNft.get('sui:testnet') as any,
          arguments: [
            tx.pure('Suiet NFT'),
            tx.pure('Suiet Sample NFT'),
            tx.pure('https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4')
          ]
        })
        const resData = await signAndExecuteTransactionBlock({
          transactionBlock: tx,
        });
        console.log('nft minted successfully!', resData);
        return resData
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async verifySignedMessage() {
      try {
        const msg = 'Hello world!'
        const msgBytes = new TextEncoder().encode(msg)
        const result = await signMessage({
          message: msgBytes
        })
        const verifyResult = verifySignedMessage(result)
        console.log('verify signedMessage', verifyResult)
        if (!verifyResult) {
          return Promise.reject(`signMessage succeed, but verify signedMessage failed`)
        } else {
          return Promise.resolve(verifyResult)
        }
      } catch (e) {
        console.error('signMessage failed', e)
        return Promise.reject('signMessage failed (see response in the console)')
      }
    },
    balance() {
      // return balance
    }
  }

  const requestFun = async (item: any) => {
    if (wallet.connected) {
    try {
      const res = await requestObj[item.method]()
      callList.push({
        method: item.method,
        result: JSON.stringify(res)
      })
      setcallList([...callList])
      return res;
    } catch (error) {
      callList.push({
        method: item.method,
        result: JSON.stringify(error)
      })
      setcallList([...callList])
    }
    } else {
    }
  }
  return (

    <Card title={label} extra={<div style={{ maxWidth: '30vw' }}>
      <ConnectButton
        onConnectError={(error) => {
          // if (error.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
          //   console.warn('user rejected the connection to ' + error.details?.wallet)
          // } else {
          //   console.warn('unknown connect error: ', error)
          // }
          console.log(error)
        }}
      />
    </div>}>
      <Row gutter={10}>
        {list.map((item, i) => <Col span={12} key={i}>
          <Button
            style={{ width: '100%', marginBottom: 10 }}
            type="primary"
            onClick={() => requestFun(item)}>
            <span className={styles.connectButton}>{item.method}</span>
          </Button>
        </Col>)}
      </Row>
    </Card>
  )
}

export default SuiConnect