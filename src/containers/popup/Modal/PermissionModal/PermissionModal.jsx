import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'Common/Select'
import Button from 'Common/Button'
import ModalBase from '../ModalBase'
import TimedAlert from 'Popup/TimedAlert'
import { getWebsiteHostname } from 'Containers/getServerHostName'
import link from 'Assets/link.png'
import question from 'Assets/question.png'

function getRightLinkPermissions(selectedRecipe) {

  if(selectedRecipe) {
    const isAny = selectedRecipe && selectedRecipe.linkPermissions.findIndex(item => item === 'any') > -1
    const isOrg = selectedRecipe && selectedRecipe.linkPermissions.findIndex(item => item === 'org') > -1
    
    if(isAny) {
      return 0
    } else if (isOrg) {
      return 1
    } else {
      return 2
    }
  }
  return 2
}

export const PermssionModal = (props) => {

  const repoOptions = props.repos.map(repo => ({
    label: repo.name,
    value: repo.repoId,
  }))

  const linkOptions = [
    { value: 'any', label: 'Anyone' },
    { value: 'stew', label: 'Anyone with a Stew account' },
    { value: 'off', label: 'No one (sharing off)' },
  ]

  if (props.orgs.length > 0) {
    linkOptions.push({ value: 'org', label: 'Only people in my organization' })
  }
  
  const { selectedRecipe, setPermissions } = props
  const [copiedVisible, setCopiedVisible] = useState(false)
  const [selectedLinkOptionIndex, setSelectedLinkOptionIndex] = useState(getRightLinkPermissions(selectedRecipe))
  const [selectedRepos, setSelectedRepos] = useState(selectedRecipe.repos || [])

  function handleLinkChange (selectedOptions) {
    const index = linkOptions.findIndex(item => item.value === selectedOptions.value)
    setSelectedLinkOptionIndex(index)
  }

  function handleDone() {
    setPermissions({ recipeId: selectedRecipe._id, repos: selectedRepos, linkPermissions: [linkOptions[selectedLinkOptionIndex].value] })
    props.closeModal()
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(`${getWebsiteHostname()}/shared/${selectedRecipe.shareableId}`)
      .then(() => {
        setCopiedVisible(true)
        setTimeout(() => { setCopiedVisible(false) }, 1500)
      })
  }

  console.log('selectedRecipe', selectedRecipe)
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
              <span className="tooltiptext tooltiptext--right"> 
              {
                props.isForked 
                  ? 'You can\'t edit this permission because this recipe was created by someone else.' 
                  : 'Who can view your recipe via shareable link?'
              } 
              </span>
            </div>
          </div> 
          <Select options={ linkOptions } defaultValue={ linkOptions[selectedLinkOptionIndex] } onChange={ handleLinkChange } isDisabled={ props.isForked } />
        </div>
        <div className='permissions-modal__selection'>
          <p> Share to team repository </p>
          <Select 
            options={ repoOptions } 
            isMulti 
            className='permissions-modal__select-override' 
            defaultValue={ selectedRecipe.repos }
            isDisabled= { repoOptions.length < 1 }
            onChange={ (selectedOptions) => setSelectedRepos(selectedOptions) }
            placeholder={  repoOptions.length > 0 ? 'Select repositories from the list' : 'No available repositories'} 
          />
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
  isForked: PropTypes.bool,
}

export default PermssionModal