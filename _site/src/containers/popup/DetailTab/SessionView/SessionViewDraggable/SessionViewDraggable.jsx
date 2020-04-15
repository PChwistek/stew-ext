import React from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Tab from '../Tab'
import windowSketch from 'Assets/window-sketch.png'
import removeRed from 'Assets/remove-red.png'

export default function SessionViewDraggable(props) {

  return (
    <DragDropContext onDragEnd={ props.onDragEnd } >
      <Droppable droppableId={ 'new' }>
        {(provided) => (
          <div  ref={ provided.innerRef }>
              <div className='createtab__new-window'>     
                <div className='createtab__window-title'> New window </div>
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
                      <Tab
                        key={ 'winIndex' + winIndex + 'tab' + tabIndex }
                        tab={ tab }
                        index={ tabIndex }
                        removeTabFromSnap={ props.removeTabFromSnap }
                        canEdit={ props.canEdit }
                        winIndex={ winIndex }
                      />
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

SessionViewDraggable.propTypes = {
  onDragEnd: PropTypes.func.isRequired,
  removeTabFromSnap: PropTypes.func.isRequired,
  removeWindowFromSnap: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired
}