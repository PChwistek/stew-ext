import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Popup } from '../containers/popup/Popup.jsx'

describe('<Popup />', () => {
  it('has a dashboard link', () => {
    const clickToDashboard = sinon.spy()
    const wrapper = shallow(<Popup goToDashboard={ clickToDashboard } dispatch={ (something) => console.log(something) } />)
    wrapper.find('.popup').simulate('click')
    expect(clickToDashboard).to.have.property('callCount', 1)
  })
})