/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import REST, { baseURL } from '../utils/REST'
import Logger from '../utils/Logger'
import Chat, { Flex, FlexItem, Notice, Bubble, useMessages, toast } from '@chatui/core'
import { Image } from 'semantic-ui-react'
// eslint-disable-next-line import/no-webpack-loader-syntax
import ChineseCSS from '!!raw-loader!@chatui/core/dist/index.css'
import Loading from '../components/Loading'
import io from 'socket.io-client'
import Iframe from 'react-iframe'
import styled from 'styled-components'
import { usePosition } from '../components/usePosition.jsx'
const rest = new REST()
const bubbleClass = styled.div`
width: 512vh;
height: 256vh;
`
export default function Chats () {
  const [isAwaitMessage, setAwaitMessage] = useState(true)
  const [isReconnect, setReconnect] = useState(false)
  const [isWaitForNext, setWaitForNext] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [isDisconnected, setDisconnected] = useState(true)
  const [socket, setSocket] = useState(false)
  const { messages, appendMsg, setTyping, deleteMsg } = useMessages([])
  const { latitude, longitude, error } = usePosition()
  let infos = { }
  localStorage.debug = '*'
  useEffect(() => {
    infos = { latitude, longitude, error }
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
      setReconnect(false)
      setDisconnected(false)
      setAwaitMessage(true)
      toast.success('서버와 연결되었습니다 :3')
    })
    socketConn.on('disconnect', () => {
      setDisconnected(true)
      socketConn.disconnect()
      Logger.warn(`[Socket.IO] [disconnect] Socket Disconnected ${baseURL}`)
    })
    socketConn.on('returnResult', async (data) => {
      setAwaitMessage(true)

      if (Math.round(data.score / data.totalScore) <= 60) {
        console.log(infos)
        if (!error && infos.latitude && infos.longitude) {
          const near = await rest.getHospitalData(infos.latitude, infos.longitude, 0)
          console.log(near)
          appendMsg({
            type: 'iframe',
            content: {
              src: `https://www.google.com/maps/embed/v1/place?key=AIzaSyBvTF_bDgOnVNtK52d0B5hLm3_idAFRO3U&q=${data['관리기관명']}`,
              text: '현재 마음이 우울하신거 같네요. 근처에 상담하실 수 있는 기관을 보여드릴게요.'
            },
            position: 'left'
          })
        } else {
          appendMsg({
            type: 'text',
            content: {
              text: '현재 마음이 우울하신거 같네요. 근처에 있는 기관에서 상담 받아보시는걸 추천드려요..!'
            },
            position: 'left'
          })
        }
      } else {
        appendMsg({
          type: 'img',
          content: { src: '/cat.png', text: '현재 마음이 편안하신 상태인거 같아요! 언제든지 고민이 생긴다면 주저하지마시고 저를 찾아주세요.' },
          position: 'left'
        })
      }
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
    switch (type) {
      case 'text':
        return <Bubble content={content.text} style={{ backgroundColor: position === 'right' ? '#0084ff' : '#eee' }} />
      case 'iframe':
        return (
          <Bubble class={bubbleClass}>
            {content.text || ''}
            <Iframe url={content.src} frameBorder='0' width='530vh' height='270vh' />
          </Bubble>
        )
      case 'img':
        return (
          <Bubble class={bubbleClass}>
            {content.text || ''}
            <Image src={content.src} style={{ width: '100%' }} />
          </Bubble>
        )
    }
  }
  /* eslint-disable react/jsx-indent */
  return (
    <> {
      isDisconnected
        ? (
          <Loading loading text='연결 끊김...' />
        )
        : (
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
    )
          </>
        )
    }
    </>
  )
}
