import React from 'react'
import PropTypes from 'prop-types'
import Tab from '../Tab'
import windowSketch from 'Assets/window-sketch.png'
import removeRed from 'Assets/remove-red.png'

export default function SessionViewNormal(props) {
  return (
    <div>
      { props.session && props.session.map((win, winIndex) => (
        <div key={ winIndex }>
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
              <Tab
                key={ 'winIndex' + winIndex + 'tab' + tabIndex }
                tab={ tab }
                index={ tabIndex }
                removeTabFromSnap={ props.removeTabFromSnap }
                canEdit={ props.canEdit }
                winIndex={ winIndex }
              />
            ))
          }
          </div>
      ))}
    </div>
  )
}

SessionViewNormal.propTypes = {
  removeTabFromSnap: PropTypes.func.isRequired,
  removeWindowFromSnap: PropTypes.func.isRequired,
  canEdit: PropTypes.bool.isRequired
}