/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import REST, { baseURL } from '../utils/REST'
import Logger from '../utils/Logger'
import Chat, { Flex, FlexItem, Notice, Bubble, useMessages, toast } from '@chatui/core'
import { Message, Icon } from 'semantic-ui-react'
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChineseCSS from '!!raw-loader!@chatui/core/dist/index.css'
import Loading from '../components/Loading'
import io from 'socket.io-client'

export default function Chats () {
  const [isAwaitMessage, setAwaitMessage] = useState(true)
  const [isReconnect, setReconnect] = useState(false)
  const [isWaitForNext, setWaitForNext] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [socket, setSocket] = useState(false)
  const { messages, appendMsg, setTyping, deleteMsg } = useMessages([])
  localStorage.debug = '*'
  useEffect(() => {
    setReconnect(false)
    const socketConn = io(baseURL + '/chatBot')
    socketConn.io.on('reconnect', () => {
      setReconnect(true)
    })
    socketConn.on('connect', () => {
      messages.map(el => deleteMsg(el._id))
      Logger.info('[Chat] Clear Messages')
      Logger.info(`[Socket.IO] [connect] Socket Connected ${baseURL}`)
      setSocket(socketConn)
      setLoading(false)
      setAwaitMessage(true)
      setReconnect(false)
      toast.success('서버와 연결되었습니다 :3')
    })
    socketConn.on('disconnect', () => {
      Logger.warn(`[Socket.IO] [disconnect] Socket Disconnected ${baseURL}`)
    })
    socketConn.on('returnResult', (data) => {
      setAwaitMessage(true)
      appendMsg({
        type: 'iframe',
        content: { src: 'https://www.youtube.com/embed/p8vu2j-oVZA' },
        position: 'left'
      })
    })
    socketConn.on('botMessage', (data) => {
      Logger.debug(`[Socket.IO] [botMessage] appendMsg(${data.content})`)
      setWaitForNext(!data.waitForNext)
      appendMsg({
        type: 'text',
        content: { text: data.content },
        position: 'left'
      })
      setAwaitMessage(false)
    })
    socketConn.on('messageDenied', (data) => {
      Logger.debug(`[Socket.IO] [messageDenied] messageDenied ${data.content}`)
      toast.fail('메세지 내용에 비속어가 담겨있어 전송이 취소되었어요.')
      setAwaitMessage(true)
    })
    socketConn.on('messageAccepted', (data) => {
      Logger.debug(`[Socket.IO] [messageAccepted] appendMsg(${data.content})`)
      setAwaitMessage(true)
      appendMsg({
        type: 'text',
        content: { text: data.content },
        position: 'right'
      })
      setTyping(true)
    })
    return isReconnect ? socketConn.destroy() : ''
  }, [isReconnect])
  function handleSend (type, content) {
    content = content.trim()
    if (content.length <= 0) return
    if (!(content.length >= 4)) return toast.fail('보낼 메세지의 길이는 4글자 이상이여야 해요.')
    if (isWaitForNext) return
    if (isAwaitMessage) return
    Logger.debug(`[Chat] Message Typed ${content} Type: ${type}`)
    if (type !== 'text') return Logger.warn('[Chat] UnSupported Message Type')
    else {
      socket.emit('clientMessage', { content })
    }
  }
  function renderMessageContent (msg) {
    const { type, position, content } = msg
    // 빨리 수정점요 ^^아 ㅇㅋ
    switch (type) {
      case 'text':
        return <Bubble content={content.text} style={{ backgroundColor: position === 'right' ? '#0084ff' : '#eee' }} />
      case 'iframe':
        return (
          <Bubble style={{ overflow: 'hidden', width: '100vh', height: '100vh' }}>
            <iframe src={content.src} style={{ position: 'relative', height: '100%', width: '100%' }} />
          </Bubble>
)
    }
  }
  /* eslint-disable react/jsx-indent */
  return (
    <>
      {
        isReconnect
          ? (
            <>
            <Loading loading text='재접속 중...' />
            </>
          )
          : <Loading loading={isLoading}>
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
      }
    </>
  )
}
