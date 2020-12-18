import React, { useState } from 'react'
import { Container, Button, Input, InputGroupAddon } from 'semantic-ui-react'
import Message from '../components/Message'
import MessageList from '../components/MessageList'

export default function Chat () {
  const [userInput, setInput] = useState('')
  const [chats, setChats] = useState([])
  function addChat (chat) {
    setChats(oldChats => [...oldChats, chat])
  }

  function handleKeydown (e) {
    if (e.key === 'Enter') return handleSubmit()
  }
  function handleSubmit () {
    addChat({ content: userInput, self: true })
    setInput('')
  }

  function handleChange (e) {
    setInput(e.target.value)
  }
  return (
    <Container>
      <MessageList>
        {chats.map((el, i) => (<Message key={i} self={el.self}>{el.content}</Message>))}
      </MessageList>
      <Input size='large' onKeyDown={handleKeydown} value={userInput} onChange={handleChange} placeholder='이야기를 해보세요.' />
    </Container>
    // <Container>
    //   <MessageList>
    //     {chats.map((el, i) => (<Message key={i} self={el.self}>{el.content}</Message>))}
    //   </MessageList>
    //   <InputGroup className=''>
    //     <Input placeholder='이야기를 해보세요.' size='lg' onKeyDown={handleKeydown} value={userInput} onChange={handleChange} />
    //     <InputGroupAddon addonType='append'>
    //       <Button color='success' onClick={handleSubmit}>전송</Button>
    //     </InputGroupAddon>
    //   </InputGroup>
    // </Container>
  )
}
