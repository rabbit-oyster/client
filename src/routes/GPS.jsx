/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { geolocated } from 'react-geolocated'

function Demo (props) {
  return (<></>
  )
}

const Location = geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Demo)

const App = () => {
  const innerRef = useRef()

  const getLocation = () => {
    innerRef.current && innerRef.current.getLocation()
  }

  return (
    <article style={{ textAlign: 'center' }}>
      {/* eslint-disable-next-line no-console */}
      <Location onError={(error) => console.log(error)} ref={innerRef} />
      <button
        className='pure-button pure-button-primary'
        onClick={getLocation}
        type='button'
      >
        Get location
      </button>
    </article>
  )
}
export default App
