import React from 'react'
import SlideIn from '../SlideIn'
import TextField from '../../common-ui/TextField'
import Checkbox from '../../common-ui/Checkbox'
import Button from '../../common-ui/Button'
import SessionView from '../SessionView'

export default function CreateTab(props) {

  const { 
    tabs, removeTabFromSnap, getCurrentTabs, removeWindowFromSnap, 
    setRecipeName, setRecipePublic, setRecipeTag, addRecipeTag, 
    removeRecipeTag, clearFields, createRecipe
   } = props
  const session = tabs.session
  const { recipeForm: { recipeName, isPublic, recipeTags, recipeTag } } = tabs
  
  return (
    <SlideIn { ...props } >
      <div className={ 'createtab' }>
        <div className={ 'createtab__form'}>
          <div className={ 'createtab__form-row'}>
            <TextField type={ 'text' } label={ 'Recipe Name' } setValue={ setRecipeName } value={ recipeName } /> 
          </div>
          <div className={ 'createtab__form-row'}>
            <TextField type={ 'text' } label={ 'Add tags' } setValue={ setRecipeTag } clearOnEnter={ true } onEnter={ addRecipeTag } value={ recipeTag } /> 
          </div>
          <div className={ 'tag-container' } >
          {
            recipeTags && 
              recipeTags.map(tag => {
              return (
                <div key={ tag.text } className={ 'tag' }>
                  { tag.text }
                  <div className={ 'tag__remove' } onClick={ () => removeRecipeTag(tag)}>
                    <img src={'../../../assets/remove-white.png'} />
                  </div>
                </div>
              )
            })
          }
          </div>   
          <div className={ 'createtab__form-row'}>
              <Checkbox label={ 'Make public?' } checked={ isPublic } setValue={ () => setRecipePublic(!isPublic) }/>
            </div>
          <div className={'createtab__bottom-row'}>
            <div className={ 'createtab__form-row--submit'}>
              <Button text={ 'Save' } type={ 'primary' } onClick={ createRecipe } />
            </div>
            <div className={ 'createtab__clear content' }>
              <div className={ 'link' } onClick={ clearFields }>
                Clear Fields
              </div>
            </div>
          </div>
        </div>
        <SessionView 
          session={ session } 
          removeTabFromSnap={ removeTabFromSnap } 
          removeWindowFromSnap={ removeWindowFromSnap } 
          getCurrentTabs={ getCurrentTabs }
          canEdit
        />
      </div>
    </SlideIn>
  )
}