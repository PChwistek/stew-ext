import React from 'react'
import SlideIn from '../SlideIn'
import SessionView from '../SessionView'
import { getSrc } from '../utils'

export default function DetailTab(props) {
  const { toView } = props
  console.log('row', toView)
  return(
    <SlideIn { ...props }>
      <div className={ 'detailtab' }>
        <div className={ 'detailtab__details'}>
          <div>
            { toView.name }
          </div>
          <div>
            {/* {
               toView.attributes.map(attrib => {
              <img src={ getSrc(attrib) } />
            })} */}
          </div>
          <div>
            { toView.author }
          </div>
        </div>
        <SessionView />
      </div>
    </SlideIn>
  )

}
