import React from 'react'
import { CSSTransition } from "react-transition-group"

export default function NoTags(props) {
  return (
    <CSSTransition 
      in={ props.open } 
      timeout={ 200 } 
      classNames={ 'p' }
      unmountOnExit
    >
      <div className='preview-tags'>
        { props.text }
      </div>
    </CSSTransition>
  )
}