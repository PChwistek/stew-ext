import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'Common/Select'
import Button from 'Common/Button'
import ModalBase from '../ModalBase'
import TimedAlert from 'Popup/TimedAlert'
import { getWebsiteHostname } from 'Containers/getServerHostName'
import link from 'Assets/link.png'
import question from 'Assets/question.png'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla2', label: 'Vanilla' },
  { value: 'vanilla3', label: 'Vanilla' },
  { value: 'vanilla4', label: 'Vanilla' },
  { value: 'vanilla', label: 'Vanilla' }
]

const linkOptions = [
  { value: 'any', label: 'Anyone' },
  { value: 'org', label: 'Only people in my organization' },
  { value: 'off', label: 'No one (sharing off)' },
]

function getRightLinkPermissions(selectedRecipe) {

  const isAny = selectedRecipe.linkPermissions.findIndex(item => item === 'any') > -1
  const isOrg = selectedRecipe.linkPermissions.findIndex(item => item === 'org') > -1
  
  if(isAny) {
    return 0
  } else if (isOrg) {
    return 1
  } else {
    return 2
  }
}

export const PermssionModal = (props) => {
  const { selectedRecipe, setPermissions } = props
  const [copiedVisible, setCopiedVisible] = useState(false)
  const [selectedLinkOptionIndex, setSelectedLinkOptionIndex] = useState(getRightLinkPermissions(selectedRecipe))

  function handleLinkChange (selectedOptions) {
    const index = linkOptions.findIndex(item => item.value === selectedOptions.value)
    setSelectedLinkOptionIndex(index)
  }

  function handleDone() {
    setPermissions({ recipeId: selectedRecipe._id, repos: [], linkPermissions: [linkOptions[selectedLinkOptionIndex].value] })
    props.closeModal()
  }

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
          <div className='permissions-modal__title'> Link Permissions <div className={ 'tooltip' }>
              <img src={ question } className={'permissions-modal__help-icon'} />
              <span className="tooltiptext tooltiptext--right"> Who can view your recipe via shareable link? </span>
            </div>
          </div> 
          <Select options={ linkOptions } defaultValue={ linkOptions[selectedLinkOptionIndex] } onChange={ handleLinkChange } />
        </div>
        <div className='permissions-modal__selection'>
          <p> Share to team repository </p>
          <Select options={ options } isMulti className='permissions-modal__select-override' isDisabled placeholder={ 'Team upgrade needed to unlock'} />
        </div>
        <TimedAlert 
          visible={ copiedVisible }
          text={ 'Shareable Link Copied'}
        />
        <div className='permissions-modal__done-container'>
          <Button type='small primary' text='Done' onClick={ handleDone } />
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
  title: PropTypes.string,
  setPermissions: PropTypes.func.isRequired,
}

export default PermssionModal