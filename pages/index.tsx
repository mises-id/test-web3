import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

import { walletFunctionNames } from '../utils/walletFunctionNames';
import { Button, Col, Modal, Row } from 'antd';
import { useState } from 'react';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import EthConnect from '../components/Eth';
import MisesWallet from '../components/MisesWallet';
import AptosWallet from '../components/Aptos';
import SuiConnect from '../components/Sui';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
const Home: NextPage = () => {
  // const [ethAccount, setaccount] = useState('')
  const [callList, setcallList] = useState<{
    method: string,
    result: any
  }[]>([]);


  const suiRequestFun = async (label: string, item: any) => {
    const walletProvider = (window as any).martian.sui
    try {
      let params = item.params
      const res = await walletProvider?.[item.method]?.bind(walletProvider)(...params)
      callList.push({
        method: item.method,
        result: JSON.stringify(res)
      })
      setcallList([...callList])
    } catch (err: any) {
      callList.push({
        method: item.method,
        result: JSON.stringify(err?.message || err)
      })
      setcallList([...callList])
      console.log(err)
    }
  }



  const connectFunction = (label: string, item: any) => {
    switch (label) {
      case 'sui':
        suiRequestFun(label, item)
        break;
        break;
    }
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {
          walletFunctionNames.map((val, index) => {
            const props = {
              callList,
              setcallList,
              label: val.label,
              list: val.list
            }
            if (val.type === 'eth') {
              return <div key={index} className={styles.walletContainer}>
                <EthConnect {...props} />
              </div>
            }
            if (val.type === 'mises') {
              return <div key={index} className={styles.walletContainer}>
                <MisesWallet {...props} />
              </div>
            }
            if (val.type === 'aptos') {
              return <div key={index} className={styles.walletContainer}>
                <AptosWallet {...props} />
              </div>
            }
            if (val.type === 'sui') {
              return <div key={index} className={styles.walletContainer}>
                <SuiConnect {...props} />
              </div>
            }
          })
        }
        <div>
          <p>
            <span>操作结果：{callList.length}</span>
            <span onClick={() => setcallList([])} style={{ color: 'red', display: 'inline-block', marginLeft: 10 }}>清除所有</span>
          </p>
          {callList.map((val, index) => {
            return <div key={index} style={{ marginBottom: 5 }}>
              {val.method}{':>>>>>'} <span style={{ color: 'blue', wordBreak: 'break-all' }}>{val.result}</span>
            </div>
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
