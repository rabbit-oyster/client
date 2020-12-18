import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'

function Loading ({ loading, children }) {
  return (
    <>
      {
        loading
          ? (
            <>
              <Dimmer active={loading} style={{ opacity: 0.4 }}>
                <Loader />
              </Dimmer>
            </>
          )
          : children
      }
    </>
  )
}

Loading.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element
}
export default Loading
