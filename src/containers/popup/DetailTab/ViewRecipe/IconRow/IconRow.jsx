import React from 'react'
import PropTypes from 'prop-types'
import star from 'Assets/star1.png'
import starOutline from 'Assets/star1-outline.png'
import edit from 'Assets/edit.png'
import archive from 'Assets/trash.png'

const IconRow = (props) => (
  <div className={ 'detailtab__icons'}>
    <div>
      <img 
        src={ props.isFavorite ? star : starOutline } 
        className={ 'detailtab__icons__edit' } 
        onClick={ props.handleFavoriteClicked }
    />
    </div>
    <div>
      <img 
        src={ edit } 
        className={ 'detailtab__icons__edit' } 
        onClick={ props.handleEditingClicked } 
      />
    </div>
    <div>
      <img 
        src={ '../../../assets/share.png'} 
        className={ 'detailtab__icons__edit' } 
        onClick={ props.handleShareClicked } 
      />
    </div>
    <div>
      <img 
        src={ archive } 
        className={ 'detailtab__icons__edit' } 
        onClick={ props.handleDeleteClicked } 
      />
    </div>
  </div>
)

IconRow.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  handleEditingClicked: PropTypes.func.isRequired,
  handleFavoriteClicked: PropTypes.func.isRequired,
  handleDeleteClicked: PropTypes.func.isRequired,
  handleShareClicked: PropTypes.func.isRequired,
}

export default IconRow