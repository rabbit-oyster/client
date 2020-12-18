import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Message from './Message'

function MessageList ({ children }) {
  const List = styled.li`
    list-style: none;
    margin: 0;
    padding: 0;
  `
  return (
    <List>
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
    </List>
  )
}

MessageList.propTypes = {
  children: PropTypes.arrayOf(Message)
}

export default MessageList
