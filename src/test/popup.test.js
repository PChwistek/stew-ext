import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { addCount, openDashboard } from '../containers/popup/popup.actions'

import { Popup } from '../containers/popup/Popup.jsx'
import { POPUP } from '../containers/actionTypes'


describe('<Popup />', () => {
  it('has a dashboard button', () => {
    const clickToDashboard = sinon.spy()
    const wrapper = shallow(<Popup goToDashboard={ clickToDashboard } addCount={ addCount } />)
    wrapper.find('.popup').simulate('click')
    expect(clickToDashboard).to.have.property('callCount', 1)
  })
})

describe('Popup actions', () => {

  it('should create a Popup - Open Dashboard action', () => {
    const expectedAction = {
      type: POPUP.OPEN_DASHBOARD
    }

    expect(openDashboard()).to.eql(expectedAction)

  })
})