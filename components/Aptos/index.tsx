import React, { useState } from 'react'
import { walletProps } from '../Eth'
import { Button, Card, Col, Modal, Row } from 'antd';
import styles from '../../styles/Home.module.css';

const AptosWallet = (props: walletProps) => {
  const { callList, setcallList, label, list } = props;
  const [account, setaccount] = useState('')
  const requestFun = async (item: any) => {
    const walletProvider = (window as any).martian
    if (!walletProvider) {
      Modal.warning({
        content: '当前仅支持 martian, 请先下载martian',
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
      return res;
    } catch (err: any) {
      callList.push({
        method: item.method,
        result: JSON.stringify(err?.message || err)
      })
      setcallList([...callList])
      console.log(err)
    }
  }
  const connect = async ()=>{
    if(account){
      setaccount('')
      return
    }
    const { authentication_key } = {} = await requestFun({
      method: 'getAccount',
      params: (account: string) => [account],
      type: 'account'
    })
    if(authentication_key){
      setaccount(authentication_key)
    }
  }
  return (
    <Card title={label} extra={<Button type='primary' danger={!!account} onClick={connect}>
      {account ? "DisConnect" : 'Connect'}
    </Button>}>
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

export default AptosWallet