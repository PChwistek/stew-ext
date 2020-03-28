import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import windowSketch from 'Assets/window-sketch.png'
import removeRed from 'Assets/remove-red.png'
import chrome from 'Assets/chrome.png'

export default function(props) {

  return (
    <DragDropContext onDragEnd={ props.onDragEnd } onBeforeDragStart={ props.beforeDragStart }>
      <Droppable droppableId={ 'new' }>
        {(provided) => (
          <div  ref={ provided.innerRef}>
              <div className='createtab__new-window'>     
                <div className='createtab__window-title'>New window </div>
                <img src={ windowSketch } className='createtab__window-icon' />
              </div>
              <div className='tab__row'>
                <div className='createtab__new-window-target' />
              </div>
              { provided.placeholder }
          </div>
        )}
      </Droppable>
    {
      props.session && props.session.map((win, winIndex) => (
        <Droppable droppableId={ `${winIndex}`} key={ 'window' + winIndex}>
          {(provided) => (
            <div key={ winIndex }  ref={provided.innerRef}>
              <div className='createtab__window-row'>     
                <div className='createtab__window-title'>Window { winIndex + 1 } </div>
                  <img src={ windowSketch } className='createtab__window-icon' />
                  {
                    props.canEdit && (
                      <div className='createtab__window-remove-container' onClick={ () => props.removeWindowFromSnap(winIndex) }> 
                        <img src={ removeRed } className='createtab__window-remove' />
                      </div>    
                    )
                  }
              </div>
              {
                (win && win.tabs.length > 0) && win.tabs.map( (tab, tabIndex) => (
                  <Draggable
                    key={ `${tab.url}${tabIndex}` }
                    draggableId={`${tab.url}-${tabIndex}-${winIndex}`}
                    index={ tabIndex }
                  >
                  {(provided) => (
                     <div
                        key={ winIndex + 'tabIndex' + tabIndex }
                        className='tab__row' 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                     >
                        {
                          props.canEdit && (
                            <div key={ 'remove' + tabIndex} className='tab__remove-container' onClick={ () => props.removeTabFromSnap(winIndex, tabIndex) }> 
                              <img src={ removeRed } className='tab__remove' />
                            </div>
                          )
                        }
                        <div className='tab__body'>
                          <img src={ tab.favIconUrl || chrome } className='tab__fav' />
                            <p className='tab__title'>
                              { tab.title }          
                            </p>
                        </div>
                    </div>
                )}
                </Draggable>
              ))}
            { provided.placeholder }
            </div>
          )}
        </Droppable>
      ))
    }
  </DragDropContext>
  )
}