import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'
function MessageList (props) {
  return (
    <ul className='messageList' {...props}>
      {
        props.children && (
          React.Children.map(props.children, (child, i) => {
            let type
            if (!props.children[i - 1] && !props.children[i + 1]) type = 'solo'
            else if (props.children[i - 1] && props.children[i - 1].props.self === child.props.self) {
              if (props.children[i + 1] && (props.children[i + 1].props.self === child.props.self)) type = 'middle'
              else type = 'last'
            } else if (props.children[i + 1] && props.children[i + 1].props.self === child.props.self) type = 'first'
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
    </ul>
  )
}

MessageList.propTypes = {
  children: PropTypes.arrayOf(Message)
}

export default MessageList
