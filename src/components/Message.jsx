import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

function Message ({ self, children }) {
  const MessageBox = styled.ul`
    display: inlone-block;
    clear: both;
    padding: 15px;
    border-radius: 20px;
    margin-bottom: 1px;
    background: ${props => props.self ? '#0084ff' : '#eee'};
    color: ${props => props.self ? '#fff' : 'black'};
    float: ${props => props.self ? 'right' : 'left'};
  `

  return (
    <MessageBox self={self}>{children}</MessageBox>
  )
}

Message.propTypes = {
  children: PropTypes.element,
  self: PropTypes.bool
}

export default Message
