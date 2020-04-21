import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import IconRow from './IconRow'
import { getSrc } from 'Containers/utils'
import Button from 'Common/Button'
import ConfirmModal from 'Popup/Modal/ConfirmModal'
import { getWebsiteHostname } from 'Containers/getServerHostName'
import TimedAlert from '../TimedAlert'

const ViewRecipe = (props) => {
  const { selectedRecipe, launchRecipe, deleteRecipe, isFavorite, setFavorite } = props
  const [modalVisible, setModalVisible] = useState(false)
  const [copiedVisible, setCopiedVisible] = useState(false)

  function handleDeleteClicked() {
    setModalVisible(true)
  }

  function handleFavoriteClicked() {
    setFavorite(selectedRecipe._id, !isFavorite)
  }

  function handleShareClicked() {
    navigator.clipboard.writeText(`${getWebsiteHostname()}/shared/${selectedRecipe.shareableId}`)
      .then(() => {
        setCopiedVisible(true)
        setTimeout(() => { setCopiedVisible(false) }, 1500)
      })
  }

  return ( 
      <div className='detailtab__details__container'>
      {
        selectedRecipe &&
          <Fragment> 
          <div className='detailtab__details'>
            <div className={ 'detailtab__details__title'}>
              { selectedRecipe.name }
            </div>
            <div>
                Published by: { selectedRecipe.author }
                <div>
                {
                  selectedRecipe.attributes && selectedRecipe.attributes.map(attrib => {
                    <img key={ attrib } src={ getSrc(attrib) } />
                  })
                } 
                </div>
              </div>
              <div>
                <div className={ 'table__row__tags'}>
                    {
                      selectedRecipe.tags && selectedRecipe.tags.map(tag => (
                        <div key={ tag } className={ 'tag-result' }>
                          { tag }
                        </div>
                      ))
                    }
                    </div>
              </div>
              <div className={ 'detailtab__launch' }>
                <Button text={ 'Launch' } type={ 'primary' } onClick={ () => launchRecipe(selectedRecipe || {}) } />
              </div>
              <ConfirmModal 
                show={ modalVisible } 
                closeModal={ () => setModalVisible(false) } 
                title={ `Are you sure you want to archive '${props.selectedRecipe.name}'?` }
                onNoClick={ () => setModalVisible(false) }
                onYesClick={ deleteRecipe }
              />
              <IconRow
                handleEditingClicked={ props.handleEditingClicked } 
                handleDeleteClicked={ handleDeleteClicked }
                handleShareClicked={ handleShareClicked }
                handleFavoriteClicked={ handleFavoriteClicked }
                isFavorite={ isFavorite }
              />
              <TimedAlert 
                visible={ copiedVisible }
                text={ 'Shareable Link Copied'}
              />
            </div>
        </Fragment>
      }
    </div>
  )
}

ViewRecipe.propTypes = { 
  handleEditingClicked: PropTypes.func.isRequired,
  launchRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  setFavorite: PropTypes.func.isRequired
}

export default ViewRecipe