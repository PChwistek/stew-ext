import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SessionViewDraggable from './SessionViewDraggable'
import SessionViewNormal from './SessionViewNormal'

export default function SessionView(props) {

  const { removeWindowFromSnap, removeTabFromSnap, canEdit, session, getCurrentTabs } = props

  const [isDragging, setDragging] = useState(false)

  function onDragEnd(result) {
    const { source, destination } = result
    props.moveTab(source, destination)
    setDragging(false)
  }

  function beforeDragStart() {
    setDragging(true)
  }

  return (
    <div className='createtab__session'>
      <div className='createtab__title-row'>
        <div className='createtab__title'>
          Session Snapshot
        </div>
        {
          canEdit && (
            <div onClick={ getCurrentTabs }>
              <img src={ '../../../assets/reload.png' } className={ 'createtab__refresh' }/>
            </div>
          )
        }
        </div>
        <div className={ canEdit ? 'tab__col' : 'tab__col tab__col--normal' }>
        {
          canEdit 
            ? <SessionViewDraggable 
              session={ session }
              canEdit={ canEdit }
              removeWindowFromSnap={ removeWindowFromSnap } 
              removeTabFromSnap={ removeTabFromSnap} 
              onDragEnd={ onDragEnd }
              isDragging={ isDragging }
              beforeDragStart={ beforeDragStart }
            />
            : <SessionViewNormal 
              session={ session } 
              canEdit={ canEdit }
              removeWindowFromSnap={ removeWindowFromSnap } 
              removeTabFromSnap={ removeTabFromSnap} 
            />
        }
      </div>
    </div>
  )
}