/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import REST, { baseURL } from '../utils/REST'
import Logger from '../utils/Logger'
import Chat, { Bubble, useMessages } from '@chatui/core'
import '@chatui/core/dist/index.css'
import Loading from '../components/Loading'
import io from 'socket.io-client'

export default function Chats () {
  const [isErrored, setErrorState] = useState(true)
  const [socket, setSocket] = useState(false)
  const { messages, appendMsg, setTyping } = useMessages([{ type: 'text', content: { text: '안녕하세요! 저는 당신을 사랑하고 있는 산군이에요! 사랑해요~' } }])
  useEffect(() => {
    
  }, [])

  function handleSend (type, content) {
    if (type !== 'text') return
    appendMsg({ type, content: { text: content } })
  }
  function renderMessageContent (msg) {
    const { type, position, content } = msg
    return <Bubble content={content.text} style={{ backgroundColor: position === 'right' ? '#0084ff' : '#eee' }} />
  }
  return (
    <>
      <Loading loading={isLoading}>
        <Chat
          navbar={{ title: 'CHAT' }}
          messages={messages}
          renderMessageContent={renderMessageContent}
          onSend={handleSend}
          placeholder='메세지를 입력해주세요.'
        />
      </Loading>
    </>
  )
}
