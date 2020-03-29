import date from 'date-and-time'

import fire from 'Assets/fire.png'
import star from 'Assets/star1.png'


export function getSrc(attribute) {
  switch(attribute){
    case 'Popular': 
      return fire
    case 'Favorite':
      return star
  }
}

export function removeDocumentListeners() {
  document.onkeydown = null
}

export function getDaysFrom(theDate) {
  const now = new Date()
  const theModifiedDate = new Date(theDate)
  const theDays = date.subtract(now, theModifiedDate).toDays()

  if(theDays < 1.0) {
    return 'today'
  }

  return `${Math.round(theDays)} days ago`
}