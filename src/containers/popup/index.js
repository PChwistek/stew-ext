import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import proxyStore from '../common-ui/store'

import Popup from './Popup'

proxyStore.ready().then(() => {
  render(
    <Provider store={ proxyStore }>
      <Popup />
    </Provider>,
    document.getElementById('root')
  )
})
