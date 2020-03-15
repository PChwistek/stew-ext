import React, { createRef, useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '../../../common-ui/TextField'
import Button from '../../../common-ui/Button'

export default function EditRecipe(props) {

  const { tabs, setRecipeName, setRecipeTag, addRecipeTag, 
    removeRecipeTag, clearFields, handleSaveRecipe } = props

  const [formErrors, setFormErrors] = useState([])


  const { recipeForm: { recipeName, recipeTags, recipeTag } } = tabs

  let recipeNameField = createRef()
  let tagsField = createRef()

  function handleSave() {
    const temp = []
    if(recipeName.length < 1) {
      temp.push('Recipe name cannot be empty.')
    }

    if(tabs.session.length < 1) {
      temp.push('Session snapshot cannot be empty.')
    }
    if(temp.length === 0) {
      handleSaveRecipe()
    } else {
      setFormErrors(temp)
    }
  }

  function validateName(name) {
    if(name.length >= 25) {
      return { isValid: false, error: 'Max character length of 25' }
    }
    return { isValid: true, error: '' }
  }

  function validateTag(tag) {
    if(tag.length >= 25) {
      return { isValid: false, error: 'Max character length of 25' }
    }
    return { isValid: true, error: '' }
  }


  function handleOnEnterValidation(entered) {
    if(recipeTags.length >= 5) {
      return { isValid: false, error: 'Max of 5 tags' }
    }
    if(entered.length < 2) {
      return { isValid: false, error: 'Tag must be at least two characters long' }
    } 
    
    if(recipeTags.find(tag => entered == tag)) {
      return { isValid: false, error: 'Tag already exists' }
    } 
    
    return { isValid: true, error: ''}
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
          validate={ validateName }
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
          validate={ validateTag }
          onEnter={ addRecipeTag }
          onEnterValidation= { handleOnEnterValidation }
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
        {
          formErrors && formErrors.map( (error, index) => (
            <div key={'error'+ index} className="createtab__error">
              { error }
            </div>
          ))
        }
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