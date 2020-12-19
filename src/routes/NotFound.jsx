import React from 'react'
import { Container } from 'semantic-ui-react'

export default function NotFound () {
  return (
    <div style={{ height: '100vh', padding: '30vh 0' }}>
      <Container textAlign='center'>
        <h1 style={{ fontSize: '10em' }}>404</h1>
        <h1 style={{ fontSize: '4em' }}>Not Found</h1>
      </Container>
    </div>
  )
}
