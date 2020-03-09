import React from 'react'

const IconRow = (props) => (
  <div className={ 'detailtab__icons'}>
    <div>
      <img 
        src={ props.isFavorite ? '../../../../../assets/star1.png' : '../../../../../assets/star1-outline.png'} 
        className={ 'detailtab__icons__edit' } 
        onClick={ props.handleFavoriteClicked }
    />
    </div>
    <div>
      <img 
        src={ '../../../assets/edit.png'} 
        className={ 'detailtab__icons__edit' } 
        onClick={ props.handleEditingClicked } 
      />
    </div>
    {/* <div>
      <img src={ '../../../assets/share.png'} className={ 'detailtab__icons__edit' } />
    </div> */}
    <div>
      <img 
        src={ '../../../assets/trash.png'} 
        className={ 'detailtab__icons__edit' } 
        onClick={ props.handleDeleteClicked } 
      />
    </div>
  </div>
)

export default IconRow