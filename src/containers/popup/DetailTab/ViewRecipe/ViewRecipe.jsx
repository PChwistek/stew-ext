import React, { useState, Fragment } from 'react'
import IconRow from './IconRow'
import { getSrc } from '../../utils'
import Button from '../../../common-ui/Button'
import ConfirmModal from '../../Modal/ConfirmModal'

const ViewRecipe = (props) => {
  const { selectedRecipe, launchRecipe, deleteRecipe, isFavorite, setFavorite } = props
  const [modalVisible, setModalVisible] = useState(false)

  function handleDeleteClicked() {
    setModalVisible(true)
  }

  function handleFavoriteClicked() {
    setFavorite(selectedRecipe._id, !isFavorite)
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
                title={ `Are you sure you want to delete '${props.selectedRecipe.name}'?` }
                onNoClick={ () => setModalVisible(false) }
                onYesClick={ deleteRecipe }
              />
              <IconRow
                handleEditingClicked={ props.handleEditingClicked } 
                handleDeleteClicked={ handleDeleteClicked } 
                handleFavoriteClicked={ handleFavoriteClicked }
                isFavorite={ isFavorite }
              />
            </div>
        </Fragment>
      }
    </div>
  )
}

export default ViewRecipe