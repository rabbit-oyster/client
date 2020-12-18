import React from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import Message from '../components/Message'
export default function Main () {
  const List = styled.li`
    list-style: none;
    margin: 0;
    padding: 0;
  `
  return (
    <Container>
      <List>
        <Message>안녕하세요 반갑습니다 ㅎㅎ</Message>
        <Message self>안녕하세요 반갑네요 ㅎㅎ</Message>
      </List>
    </Container>
  )
}
