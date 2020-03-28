import React from 'react'

import star from 'Assets/star1.png'
import starOutline from 'Assets/star1-outline.png'
import edit from 'Assets/edit.png'
import trash from 'Assets/trash.png'

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
    {/* <div>
      <img src={ '../../../assets/share.png'} className={ 'detailtab__icons__edit' } />
    </div> */}
    <div>
      <img 
        src={ trash } 
        className={ 'detailtab__icons__edit' } 
        onClick={ props.handleDeleteClicked } 
      />
    </div>
  </div>
)

export default IconRow