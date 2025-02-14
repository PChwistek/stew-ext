import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import IconRow from './IconRow'
import { getSrc } from 'Containers/utils'
import Button from 'Common/Button'
import ConfirmModal from 'Popup/Modal/ConfirmModal'
import PermissionModal from 'Popup/Modal/PermissionModal'
import { trackLaunchedRecipe } from '../../../analytics'

const ViewRecipe = (props) => {
  const { selectedRecipe, launchRecipe, deleteRecipe, isFavorite, setFavorite, setPermissions, isForked, repos, orgs } = props
  const [modalVisible, setModalVisible] = useState(false)
  const [pModalVisible, setPModalVisible] = useState(false)

  function handleDeleteClicked() {
    setModalVisible(true)
  }

  function handleFavoriteClicked() {
    setFavorite(selectedRecipe._id, !isFavorite)
  }

  function handleLaunchFromDetail(selectedRecipe) {
    launchRecipe(selectedRecipe || {})
    trackLaunchedRecipe(false)
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
                <Button text={ 'Launch' } type={ 'primary' } onClick={ () => handleLaunchFromDetail(selectedRecipe) } />
              </div>
              <ConfirmModal 
                show={ modalVisible } 
                closeModal={ () => setModalVisible(false) } 
                title={ `Are you sure you want to archive '${props.selectedRecipe.name}'?` }
                onNoClick={ () => setModalVisible(false) }
                onYesClick={ deleteRecipe }
              />
              {
                pModalVisible && <PermissionModal 
                show={ pModalVisible }
                closeModal={ () => setPModalVisible(false) }
                title={ 'Share Recipe' }
                selectedRecipe={ selectedRecipe }
                setPermissions={ setPermissions }
                isForked={ isForked }
                repos={ repos }
                orgs={ orgs }
              />
              }
              <IconRow
                handleEditingClicked={ props.handleEditingClicked } 
                handleDeleteClicked={ handleDeleteClicked }
                handleShareClicked={ () => setPModalVisible(true) }
                handleFavoriteClicked={ handleFavoriteClicked }
                isFavorite={ isFavorite }
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
  setFavorite: PropTypes.func.isRequired,
  setPermissions: PropTypes.func.isRequired,
  isForked: PropTypes.bool,
}

export default ViewRecipe