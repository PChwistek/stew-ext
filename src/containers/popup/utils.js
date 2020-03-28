import date from 'date-and-time'

export function getSrc(attribute) {
  switch(attribute){
    case 'Popular': 
      return 'Assets/fire.png'
    case 'Favorite':
      return 'Assets/star1.png'
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