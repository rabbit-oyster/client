/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { geolocated } from 'react-geolocated'

function Demo (props) {
  return !props.isGeolocationAvailable
    ? (
      <div>Your browser does not support Geolocation</div>
    )
    : !props.isGeolocationEnabled
      ? (
        <div>Geolocation is not enabled</div>
      )
      : props.coords
        ? (
          <table>
            <tbody>
              <tr>
                <td>latitude</td>
                <td>{props.coords.latitude}</td>
              </tr>
              <tr>
                <td>longitude</td>
                <td>{props.coords.longitude}</td>
              </tr>
              <tr>
                <td>altitude</td>
                <td>{props.coords.altitude}</td>
              </tr>
              <tr>
                <td>heading</td>
                <td>{props.coords.heading}</td>
              </tr>
              <tr>
                <td>speed</td>
                <td>{props.coords.speed}</td>
              </tr>
            </tbody>
          </table>
        )
        : (
          <div>Getting the location data&hellip; </div>
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
