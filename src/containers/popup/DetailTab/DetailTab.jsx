import React from 'react'
import SlideIn from '../SlideIn'
import SessionView from '../SessionView'

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
            { toView.map}
          </div>
          <div>
            { toView.author}
          </div>
        </div>
        <SessionView />
      </div>
    </SlideIn>
  )

}
