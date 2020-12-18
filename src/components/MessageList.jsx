import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Message from './Message'
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
function MessageList ({ children }) {
  return (
    <li className='messageList'>
      {
        children && (
          React.Children.map(children, (child, i) => {
            let type
            if (!children[i - 1] && !children[i + 1]) type = 'solo'
            else if (children[i - 1] && children[i - 1].props.self === child.props.self) {
              if (children[i + 1] && (children[i + 1].props.self === child.props.self)) type = 'middle'
              else type = 'last'
            } else if (children[i + 1] && children[i + 1].props.self === child.props.self) type = 'first'
            else type = 'solo'
            return (
              React.cloneElement(child, {
                type: type
              })
            )
          }
          )
        )
      }
    </li>
  )
}

MessageList.propTypes = {
  children: PropTypes.arrayOf(Message)
}

export default MessageList
