import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';

import { walletFunctionNames } from '../utils/walletFunctionNames';
import { Button, Col, Modal, Row, message } from 'antd';
import { useEffect, useState } from 'react';
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

  const [init, setinit] = useState(false)

  useEffect(() => {
    setinit(true)
  }, [])
  
  useEffect(() => {
    if(!init) {
      return 
    }
    if(callList.length ===0) {
      message.info('清除成功')
    }else{
      message.success('调用成功')
    }
  }, [callList.length])
  
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
