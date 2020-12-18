import React from 'react'
import { Container } from 'semantic-ui-react'

import Message from '../components/Message'
import MessageList from '../components/MessageList'
export default function Demo () {
  return (
    <Container>
      <br /><br />
      <MessageList>
        <Message>안녕하세요 반갑습니다 ㅎㅎ</Message>
        <Message self>안녕하세요 반갑네요 ㅎㅎ</Message>
        <Message self>혹시 나이가?</Message>
        <Message>다섯살이에요</Message>
        <Message self>스물셋이에요.</Message>
        <Message self>아이유의 스물셋 들어보셨어요?</Message>
        <Message self>노래 진짜 좋은거 같더라고요</Message>
        <Message>아 저도 아이유님 팬이에요</Message>
        <Message>아이유님 너무 예쁜거 같아요.</Message>
        <Message self>맞아요 ㅜㅜ</Message>
      </MessageList>
    </Container>
  )
}
