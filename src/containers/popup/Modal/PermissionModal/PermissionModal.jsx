import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'Common/Select'
import Button from 'Common/Button'
import ModalBase from '../ModalBase'
import TimedAlert from 'Popup/TimedAlert'
import { getWebsiteHostname } from 'Containers/getServerHostName'
import link from 'Assets/link.png'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla2', label: 'Vanilla' },
  { value: 'vanilla3', label: 'Vanilla' },
  { value: 'vanilla4', label: 'Vanilla' },
  { value: 'vanilla', label: 'Vanilla' }
]

const linkOptions = [
  { value: 'off', label: 'No one' },
  { value: 'anyone', label: 'Anyone' },
  { value: 'org', label: 'Only people in my organization' }
]

export const PermssionModal = (props) => {
  const { selectedRecipe } = props
  const [copiedVisible, setCopiedVisible] = useState(false)

  function copyToClipboard() {
    navigator.clipboard.writeText(`${getWebsiteHostname()}/shared/${selectedRecipe.shareableId}`)
      .then(() => {
        setCopiedVisible(true)
        setTimeout(() => { setCopiedVisible(false) }, 1500)
      })
  }

  return (
    <ModalBase show={ props.show } closeModal={ props.closeModal } >
      <div className='permissions-modal'>
        <div className='permissions-modal__top'> 
          <h1> { props.title } </h1>
          <div onClick={ copyToClipboard } className='permissions-modal__link-container'>
            <div className='permissions-modal__link-text'>
              Get shareable link 
            </div>
            <div>
              <img src={ link } className={ 'permissions-modal__link' }/>
            </div>
          </div>
        </div>
        <div>
          <p> Share to team repository </p>
          <Select options={ options } isMulti className='permissions-modal__select-override'/>
        </div>
        <div>
          <p> Link Permissions </p>
          <Select options={ linkOptions } />
        </div>
        <TimedAlert 
          visible={ copiedVisible }
          text={ 'Shareable Link Copied'}
        />
        <div className='permissions-modal__done-container'>
          <Button type='small primary' text='Done' />
        </div>
      </div>
    </ModalBase>
  )
}

PermssionModal.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func,
  onYesClick: PropTypes.func,
  onNoClick: PropTypes.func,
  title: PropTypes.string
}

export default PermssionModal