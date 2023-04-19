import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { configureChains } from 'wagmi';

import { polygon, mainnet, okc, goerli, bsc, optimism } from '@wagmi/core/chains';
import { publicProvider } from '@wagmi/core/providers/public';
import { walletFunctionNames } from '../utils/walletFunctionNames';
import { Button, Col, Modal, Row } from 'antd';
import { useState } from 'react';
// import { alchemyProvider } from 'wagmi/providers/alchemy';
const Home: NextPage = () => {
  const [ethAccount, setaccount] = useState('')
  const [callList, setcallList] = useState<{
    method: string,
    result: any
  }[]>([]);

  const ethRequestFun = (label: string, item: any) => {
    if (!window.ethereum) {
      Modal.warning({
        content: '请先下载Metamask',
        onOk: () => {
          window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en-US')
        }
      })
      return
    }
    if (ethAccount) {
      window.ethereum?.request({
        method: item.method,
        params: Array.isArray(item.params) ? item.params : item.params(ethAccount)
      }).then((res: any) => {
        if (item.method == 'eth_requestAccounts') {
          setaccount(res[0])
        }
        callList.push({
          method: item.method,
          result: res || '无内容返回'
        })
        setcallList([...callList])
      }).catch(err => {
        callList.push({
          method: item.method,
          result: JSON.stringify(err.message)
        })
        setcallList([...callList])
        console.log(err)
      })
    } else {
      window.ethereum?.request({
        method: 'eth_requestAccounts',
        params: []
      } as any).then((res: any) => {
        setaccount(res[0])
      }).catch(err => {
        console.log(err)
      })
    }
  }

  const aptosRequestFun = async (label: string, item: any) => {
    const walletProvider = (window as any).martian
    if (!walletProvider) {
      Modal.warning({
        content: '请先下载martian，当前仅支持 martian',
        onOk: () => {
          window.open('https://chrome.google.com/webstore/detail/martian-wallet-for-sui-ap/efbglgofoippbgcjepnhiblaibcnclgk?hl=en-US')
        }
      })
      return
    }
    try {
      let params = item.params
      if (!Array.isArray(params)) {
        if (item.type === 'account') {
          const response = await walletProvider.connect();
          const address = response.address;
          params = item.params(address)
        }
      }
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
      case 'eth':
        ethRequestFun(label, item)
        break;
      case 'aptos':
        aptosRequestFun(label, item)
        break;
      case 'sui':
        suiRequestFun(label, item)
        break;
      default:
        ethRequestFun(label, item)
        break;
    }
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.connectBox}>
          当前账号：{ethAccount || '未链接'}
          {/* <ConnectButton accountStatus="address"/> */}
        </div>
        {
          walletFunctionNames.map((val, index) => {
            return <div key={index}>
              <p>{val.label}</p>
              <Row gutter={10}>
                {val.list.map((item, i) => <Col span={12} key={i}>
                  <Button
                    style={{ width: '100%', marginBottom: 10 }}
                    type="primary"
                    onClick={() => connectFunction(val.type, item)}>
                    <span className={styles.connectButton}>{item.method}</span>
                  </Button>
                </Col>)}
              </Row>
            </div>
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
