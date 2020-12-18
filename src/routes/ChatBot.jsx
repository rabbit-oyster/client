/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import REST, { baseURL } from '../utils/REST'
import Logger from '../utils/Logger'
import Chat, { Bubble, useMessages, toast } from '@chatui/core'
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChineseCSS from '!!raw-loader!@chatui/core/dist/index.css'
import Loading from '../components/Loading'
import io from 'socket.io-client'

export default function Chats () {
  const [isErrored, setErrorState] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [socket, setSocket] = useState(false)
  const { messages, appendMsg, setTyping } = useMessages([])
  localStorage.debug = '*'
  useEffect(() => {
    const socketConn = io(baseURL + '/chatBot', { transport: ['websocket'] })
    socketConn.on('connect', () => {
      Logger.info(`[Socket.IO] [connect] Socket Connected ${baseURL}`)
      setSocket(socketConn)
      setLoading(false)
      toast.success('서버와 연결되었습니다 :3')
    })
    socketConn.on('disconnect', () => {
      Logger.warn(`[Socket.IO] [disconnect] Socket Disconnected ${baseURL}`)
    })
    socketConn.on('botMessage', (data) => {
      Logger.debug(`[Socket.IO] [botMessage] appendMsg(${data.content})`)
      appendMsg({
        type: 'text',
        content: { text: data.content },
        position: 'left'
      })
    })
    socketConn.on('messageDenied', (data) => {
      Logger.debug(`[Socket.IO] [messageDenied] messageDenied ${data.content}`)
      toast.fail('메세지 내용에 비속어가 담겨있어 전송이 취소되었어요 ￣へ￣;')
    })
    socketConn.on('messageAccepted', (data) => {
      Logger.debug(`[Socket.IO] [messageAccepted] appendMsg(${data.content})`)
      appendMsg({
        type: 'text',
        content: { text: data.content },
        position: 'right'
      })
      setTyping(true)
    })
  }, [])
  function handleSend (type, content) {
    content = content.trim()
    if (content.length <= 0) return
    Logger.debug(`[Chat] Message Typed ${content} Type: ${type}`)
    if (type !== 'text') return Logger.warn('[Chat] UnSupported Message Type')
    else {
      socket.emit('clientMessage', { content })
    }
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
        <style>
          {ChineseCSS}
        </style>
      </Loading>
    </>
  )
}
