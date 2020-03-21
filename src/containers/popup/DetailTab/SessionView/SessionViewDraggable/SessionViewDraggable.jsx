import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function(props) {

  return (
    <DragDropContext onDragEnd={ props.onDragEnd }>
    {
      props.session && props.session.map((win, winIndex) => (
        <Droppable droppableId={ `${winIndex}`}>
          {(provided, snapshot) => (
            <div key={ winIndex }  ref={provided.innerRef}>
              <div className='createtab__window-row'>     
                <div className='createtab__window-title'>Window { winIndex + 1 } </div>
                  <img src={ '../../../../../assets/window-sketch.png' } className='createtab__window-icon' />
                  {
                    props.canEdit && (
                      <div className='createtab__window-remove-container' onClick={ () => props.removeWindowFromSnap(winIndex) }> 
                        <img src={ '../../../../../assets/remove-red.png' } className='createtab__window-remove' />
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
                  {(provided, snapshot) => (
                     <div 
                        className='tab__row' 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                     >
                        {
                          props.canEdit && (
                            <div key={ 'remove' + tabIndex} className='tab__remove-container' onClick={ () => props.removeTabFromSnap(winIndex, tabIndex) }> 
                              <img src={ '../../../../../assets/remove-red.png' } className='tab__remove' />
                            </div>
                          )
                        }
                        <div className='tab__body'>
                          <img src={ tab.favIconUrl || '../../../../../assets/chrome.png' } className='tab__fav' />
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