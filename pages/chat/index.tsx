import Head from 'next/head'
import Script from 'next/script'
import React from 'react'

const Chat = () => {
  return (
    <>
      <Script src="./js/sdnChatWidget.js" async></Script>
      {/* @ts-ignore */}
      <chat-component baseUrl="https://portal0101.sending.network" widgetWidth="100vw" widgetHeight="94vh"/>
    </>
  )
}

export default Chat