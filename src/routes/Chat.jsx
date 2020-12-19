/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Chat, { Bubble, useMessages, toast } from '@chatui/core'
import styled from 'styled-components'
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChineseCSS from '!!raw-loader!@chatui/core/dist/index.css'
import REST, { baseURL } from '../utils/REST'
import io from 'socket.io-client'
import Logger from '../utils/Logger'
import Loading from '../components/Loading'

const rest = new REST()
export default function Chats () {
  const [state, setState] = useState(0) // 0: Loading | 1: Ready | 2: Errored | 3: sending request | 4: Start
  const [reconnecting, setReconnection] = useState(false)
  const [socket, setSocket] = useState(null)
  console.log(rest.fetchRoomID(60, 70).then(r => r))
  useEffect(() => {
    const socketConn = io(baseURL + '/chat')
    socketConn.on('connect', () => {
      Logger.info(`[Socket.IO] [connect] Socket Connected ${baseURL}`)
      setSocket(socketConn)
      setState(1)
      setReconnection(false)
      socketConn.emit('setRoom', { roomId: '6974' })
      toast.success('서버와 연결되었습니다 :>')
    })
    socketConn.on('userMessage', (data) => {
      try {
        const j = JSON.parse(data.content)
        if (j.hello) setState(4)
      } catch {
        appendMsg({
          type: 'text',
          content: { text: data.content },
          position: 'left'
        })
      }
    })
    socketConn.on('userJoined', (data) => {
      Logger.debug('[Socket.IO] [userJoined] the User have joined.')
      toast.success('유저가 입장했습니다.')
      setState(4)
    })
    socketConn.on('messageDenied', (data) => {
      Logger.debug(`[Socket.IO] [messageDenied] messageDenied ${data.content}`)
      toast.fail('메세지 내용에 비속어가 포함되어 있어 전송이 취소되었어요.')
    })
    socketConn.on('messageAccepted', (data) => {
      Logger.debug(`[Socket.IO] [messageAccepted] appendMsg(${data.content})`)
      appendMsg({
        type: 'text',
        content: { text: data.content },
        position: 'right'
      })
    })
    socketConn.on('disconnect', () => {
      Logger.warn(`[Socket.IO] [disconnect] Socket Disconnected ${baseURL}`)
      setReconnection(true)
    })
  }, [reconnecting])
  function handleSend (type, content) {
    content = content.trim()
    if (content.length <= 0) return
    if (content.length >= 2000) return toast.fail('2000자 이상 메세지는 전송하실 수 없습니다')
    if (state === 3) return
    Logger.debug(`[Chat] Message Typed ${content} Type: ${type}`)
    if (type !== 'text') return Logger.warn('[Chat] UnSupported Message Type')
    else {
      socket.emit('sendMessage', { content })
    }
  }

  function renderMessageContent (msg) {
    const { type, position, content } = msg
    return <Bubble content={content.text} style={{ backgroundColor: position === 'right' ? '#0084ff' : '#eee' }} />
  }
  const { messages, appendMsg, setTyping } = useMessages([])
  return (
    <>
      {
        reconnecting
          ? (
            <Loading loading text='재접속 중...' />
          )
          : (
            <Loading loading={state !== 4} text={state === 0 ? null : state !== 4 ? '이용자 매칭중입니다!' : null}>
              <Chat
                placeholder='메세지를 입력해주세요.'
                navbar={{ title: '상담' }}
                messages={messages}
                renderMessageContent={renderMessageContent}
                onSend={handleSend}
              />
            </Loading>
          )
      }
      <style>
        {ChineseCSS}
      </style>
    </>

  )
}
