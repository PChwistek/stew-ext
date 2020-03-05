import React, { createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import TextField from '../../../common-ui/TextField'
import Button from '../../../common-ui/Button'

export default function EditRecipe(props) {

  const { tabs, setRecipeName, setRecipeTag, addRecipeTag, 
    removeRecipeTag, clearFields, saveRecipe } = props

  const { recipeForm: { recipeName, recipeTags, recipeTag } } = tabs

  let recipeNameField = createRef()
  let tagsField = createRef()

  function handleSave() {
    saveRecipe()
  }

  function handleKeyUp(e) {
    // e.persist()
    e.which = e.which || e.keyCode
    // If the key press is Enter
    if (e.which == 13) {
      switch (e.target.id) {
        case 'recipeNameField':
          tagsField.current.focus()
          return
      }
    }
  }

  return (
    <div className={ 'createtab__form'}>
      <div className={ 'createtab__form-row'}>
        <TextField 
          tabIndex={ 1 }
          type={ 'text' } 
          id={ 'recipeNameField' }
          label={ 'Recipe Name' } 
          setValue={ setRecipeName } 
          value={ recipeName }
          innerRef={ recipeNameField }
          handleKeyUp={ handleKeyUp }
          autoFocus
        /> 
      </div>
      <div className={ 'createtab__form-row'}>
        <TextField 
          type={ 'text' } 
          label={ 'Add tags' } 
          setValue={ setRecipeTag } 
          clearOnEnter={ true } 
          onEnter={ addRecipeTag } 
          value={ recipeTag } 
          innerRef={ tagsField }
        /> 
      </div>
      <div className={ 'tag-container' } >
      {
        recipeTags && 
          recipeTags.map(tag => {
          return (
            <div key={ tag } className={ 'tag' }>
              { tag }
              <div className={ 'tag__remove' } onClick={ () => removeRecipeTag(tag)}>
                <img src={'../../../assets/remove-white.png'} />
              </div>
            </div>
          )
        })
      }
      </div>   
      {/* <div className={ 'createtab__form-row'}>
        <Checkbox label={ 'Make public?' } checked={ isPublic } setValue={ () => setRecipePublic(!isPublic) }/>
      </div> */}
      <div className={'createtab__bottom-row'}>
        <div className={ 'createtab__form-row--submit'}>
          <Button text={ 'Save' } type={ 'primary' } onClick={ handleSave } />
        </div>
        <div className={ 'createtab__clear content' }>
          <div className={ 'link' } onClick={ clearFields }>
            Clear Fields
          </div>
        </div>
      </div>
    </div>
  )
}

EditRecipe.propTypes = {
  tabs: PropTypes.object,
  setRecipeName: PropTypes.func,
  setRecipeTag: PropTypes.func,
  addRecipeTag: PropTypes.func,
  removeRecipeTag: PropTypes.func, 
  clearFields: PropTypes.func,
  createRecipe: PropTypes.func, 
  onCloseClick: PropTypes.func,
}