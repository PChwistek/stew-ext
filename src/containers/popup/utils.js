export function getSrc(attribute) {
  switch(attribute){
    case 'Popular': 
      return '../../../assets/fire.png'
    case 'Favorite':
      return '../../../assets/star1.png'
  }
}

export function removeDocumentListeners() {
  document.onkeydown = null
}