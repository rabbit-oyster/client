/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Chat, { Bubble, useMessages } from '@chatui/core'
import '@chatui/core/dist/index.css'
import io from 'socket.io-client'

export default function Chats () {
  function handleSend (type, val) {
    if (type === 'text' && val.trim()) {
      // appendMsg({
      //   type: 'text',
      //   content: { text: val },
      //   position: 'right'
      // })

      // setTyping(true)

      // setTimeout(() => {
      //   appendMsg({
      //     type: 'text',
      //     content: { text: 'Bala bala' }
      //   })
      // }, 1000)
    }
  }

  function renderMessageContent (msg) {
    const { type, position, content } = msg
    return <Bubble content={content.text} style={{ backgroundColor: position === 'right' ? '#0084ff' : '#eee' }} />
  }
  const { messages, appendMsg, setTyping } = useMessages([])
  return (
    <Chat
      navbar={{ title: 'CHAT' }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
      placeholder='메세지를 입력해주세요.'
    />

  // Your JSX...

  )
}
