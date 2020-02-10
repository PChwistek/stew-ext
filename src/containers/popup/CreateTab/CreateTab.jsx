import React from 'react'
import SlideIn from '../SlideIn'
import TextField from '../../common-ui/TextField'
import Checkbox from '../../common-ui/Checkbox'
import Button from '../../common-ui/Button'

export default function CreateTab(props) {

  const { 
    tabs, removeTabFromSnap, getCurrentTabs, removeWindowFromSnap, 
    setRecipeName, setRecipePublic, setRecipeTag, addRecipeTag, 
    removeRecipeTag, clearFields } = props
  const session = tabs.session
  const { recipeForm: { recipeName, isPublic, recipeTags, recipeTag } } = tabs

  function windowTabs(win, index) {
    return (
      <div key={ index }>
        <div className='createtab__window-row'>     
          <div className='createtab__window-title'>Window { index + 1 } </div>
            <img src={ '../../../assets/window-sketch.png' } className='createtab__window-icon' />
          <div className='createtab__window-remove-container' onClick={ () => removeWindowFromSnap(win) }> 
            <img src={ '' } className='createtab__window-remove' />
          </div>    
        </div>
        {
          win && win.tabs.map(tab => (
            <div className='tab__row' key={ tab.id }>
              <div className='tab__remove-container' onClick={ () => removeTabFromSnap(win, tab) }> 
                <img src={ '' } className='tab__remove' />
              </div>
              <div className='tab__body'>
                <img src={ tab.favIconUrl || '../../../assets/chrome.png' } className='tab__fav' />
                <p className='tab__title'> { tab.title } </p>
              </div>
          </div>
        ))
      }
      </div>
    )
  }
  
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
                <div className={ 'tag' }>
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
              <Button text={ 'Save' } type={ 'primary' } />
            </div>
            <div className={ 'createtab__clear content' }>
              <div className={ 'link' } onClick={ clearFields }>
                Clear Fields
              </div>
            </div>
          </div>
        </div>
        <div className='createtab__session'>
          <div className='createtab__title-row'>
            <div className='createtab__title'>
              Session Snapshot
            </div>
            <div onClick={ getCurrentTabs }>
              <img src={ '../../../assets/reload.png' } className={ 'createtab__refresh' }/>
            </div>
          </div>
          <div className='tab__col'>
            {
              session && session.map((win, index) => {
                return windowTabs(win, index)
              })
            }
          </div>
        </div>
      </div>
    </SlideIn>
  )
}