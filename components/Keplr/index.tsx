import React, { useState } from 'react'
import { walletProps } from '../Eth'
import { Button, Card, Col, Modal, Row } from 'antd';
import styles from '../../styles/Home.module.css';

const KeplrWallet = (props: walletProps) => {
  const { callList, setcallList, label, list } = props;
  const [account, setaccount] = useState('')

  const chainId = "cosmoshub-4";

  const requestFun = async (item: any) => {
    const walletProvider = (window as any).keplr
    if (!walletProvider) {
      Modal.warning({
        content: '请先下载keplr wallet',
        onOk: () => {
          window.open('https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=zh-cN')
        }
      })
      return
    }
    try {
      let params = item.params
      if(item.method === 'signEthereum'){
        params = [
          chainId, account, 'hello world', 'message'
        ]
      }
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
  const connect = async () => {
    if (account) {
      setaccount('')
      return
    }
    await requestFun({
      method: 'enable',
      params: [chainId]
    })
    const offlineSigner: any = await requestFun({
      method: 'getOfflineSigner',
      params: [chainId]
    })

    const [getAccount] = await offlineSigner.getAccounts();
    if(getAccount){
      setaccount(getAccount.address)
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
            onClick={async () => {
              if (!account) {
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

export default KeplrWallet