import React from 'react'
import SlideIn from '../SlideIn'

export default function CreateTab(props) {
  return (
    <SlideIn { ...props } title={ 'New Tab Recipe'}>
      <div>
        this is the create tab
      </div>
    </SlideIn>
  )
}