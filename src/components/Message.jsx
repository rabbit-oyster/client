import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
const SelfborderRadiusSet = {
  solo: '30px',
  first: '30px 30px 5px 30px',
  middle: '30px 5px 5px 30px',
  last: '30px 5px 30px 30px'
}

const BotborderRadiusSet = {
  solo: '30px',
  first: '30px 30px 30px 5px',
  middle: '5px 30px 5px 30px',
  last: '5px 30px 30px 30px'
}
const MessageBox = styled.ul`
  display: inlone-block;
  clear: both;
  padding: 15px;
  border-radius: ${props => props.self ? SelfborderRadiusSet[props.type] : BotborderRadiusSet[props.type]};
  margin-bottom: 1px;
  background: ${props => props.self ? '#0084ff' : '#eee'};
  color: ${props => props.self ? '#fff' : 'black'};
  float: ${props => props.self ? 'right' : 'left'};
  .animation-enter {
    opacity: 0.01;
  }
  .animation-enter.example-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }
`
function Message ({ type, self, children, className }) {
  return (
    <MessageBox type={type} className={self ? 'me' : 'bot'} self={self}>{children}</MessageBox>
  )
}

Message.propTypes = {
  type: PropTypes.string,
  children: PropTypes.element,
  self: PropTypes.bool,
  className: PropTypes.string
}

export default Message
