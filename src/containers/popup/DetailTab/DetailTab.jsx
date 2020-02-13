import React from 'react'
import SlideIn from '../SlideIn'
import SessionView from '../SessionView'

export default function CreateTab(props) {

  return(
    <SlideIn { ...props }>
      <div className={ 'detailtab' }>
        <div className={ 'detailtab__details'}>

        </div>
        <SessionView />
      </div>
    </SlideIn>
  )

}
