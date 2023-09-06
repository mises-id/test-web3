import React, { useState } from 'react'
import { walletProps } from '../Eth'
import { Button, Card, Col, Modal, Row } from 'antd';
import styles from '../../styles/Home.module.css';

const MisesWallet = (props: walletProps) => {
  const { callList, setcallList, label, list } = props;

  const requestFun = async (item: any) => {
    const walletProvider = (window as any).misesWallet
    try {
      let params = item.params
      console.log(walletProvider?.[item.method], item.method)
      const paramsStr = JSON.stringify(params)
      params = JSON.parse(paramsStr.replace(/misesAccount/g, account))
      console.log(params)
      const res = await walletProvider?.[item.method]?.bind(walletProvider)(...params)
      callList.push({
        method: item.method,
        result: JSON.stringify(res)
      })
      setcallList([...callList])
      return res
    } catch (err: any) {
      callList.push({
        method: item.method,
        result: JSON.stringify(err?.message || err)
      })
      setcallList([...callList])
      console.log(err)
    }
  }
  const [account, setaccount] = useState('')
  const connect = async ()=>{
    if(account){
      setaccount('')
      return
    }
    await requestFun({
      method: 'enable',
      params: ['mainnet']
    })
    
    const getAccount = await requestFun({
      method: 'misesAccount',
      params: []
    })
    setaccount(getAccount?.address)
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
            onClick={async () => {
              if(!account){
                await connect()
              }
              requestFun(item)
            }}>
            <span className={styles.connectButton}>{item.method}</span>
          </Button>
        </Col>)}
      </Row>
    </Card>
  )
}

export default MisesWallet