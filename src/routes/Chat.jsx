/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Chat, { Bubble, useMessages } from '@chatui/core'
import styled from 'styled-components'
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChineseCSS from '!!raw-loader!@chatui/core/dist/index.css'

// Your code stuff...

function Chats () {
  function handleSend (type, val) {
    if (type === 'text' && val.trim()) {
      appendMsg({
        type: 'text',
        content: { text: val },
        position: 'right'
      })

      setTyping(true)

      setTimeout(() => {
        appendMsg({
          type: 'text',
          content: { text: 'Bala bala' }
        })
      }, 1000)
    }
  }

  function renderMessageContent (msg) {
    const { type, position, content } = msg
    return <Bubble content={content.text} style={{ backgroundColor: position === 'right' ? '#0084ff' : '#eee' }} />
  }
  const { messages, appendMsg, setTyping } = useMessages([])
  console.log(ChineseCSS)
  return (
    <>
      <Chat
        placeholder='메세지를 입력해주세요.'
        navbar={{ title: 'Sex' }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />
      <style>
        {ChineseCSS}
      </style>
    </>

  )
}

export default Chats
