import React from 'react'
import PropTypes from 'prop-types'

import iPadSuccess from '../../../assets/icons8-ipad-100-success.png'
import iPhoneSuccess from '../../../assets/icons8-iphone-100-success.png'

import './connectedDevices.scss'

function getAppropriateImage(device) {
  if(device == 'iPhone') {
    return iPhoneSuccess
  }
  return iPadSuccess
}

const ConnectedDevices = ({ connected }) => {
  return connected.map((item, index) => (
    <div key={ index }>
      <img src={ getAppropriateImage(item.device) } className={ 'device-icon' } />
    </div>
  ))
}

ConnectedDevices.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  actionOnClick: PropTypes.func,
  connected: PropTypes.arrayOf(PropTypes.object)
}

export default ConnectedDevices