import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'

function Loading ({ text, loading, children }) {
  return (
    <>
      {
        loading
          ? (
            <>
              <Dimmer active={loading} style={{ opacity: 0.4 }}>
                <Loader content={text || '로딩중'} />
              </Dimmer>
            </>
          )
          : children
      }
    </>
  )
}

Loading.propTypes = {
  text: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.element
}
export default Loading
