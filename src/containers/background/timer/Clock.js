
export default class Clock {
  contructor() {
    this.interval = null
    this.terminationTime = null
    this.intervalAction = () => {}
    this.endingAction = () => {}
    this.timeRemaining = null
  }

  setActions(anIntervalAction, anEndingAction) {
    this.intervalAction = anIntervalAction
    this.endingAction = anEndingAction

  }

  setClock(milliseconds) {
    
    this.scheduledTime = Date.now() + milliseconds
    const sTime = this.scheduledTime
    const timerLogic = () => { // binded this
      const timeLeft = sTime - Date.now()
      this.intervalAction()
      if(timeLeft <= 0) {
        this.endingAction()
        this.clearClock()
      }
    }
  
    this.interval = setInterval(timerLogic, 1000)
  }

  pause() {
    const timeLeft = this.scheduledTime - Date.now()
    clearInterval(this.interval)
    this.timeRemaining = timeLeft
  }

  resume() {
    console.log('in resume', this.timeRemaining)
    this.setClock(this.timeRemaining)
  }

  getInterval() {
    return this.interval
  }

  clearClock() {
    console.log('resetting!')
    clearInterval(this.interval)
    this.interval = null
    this.terminationTime = null
  }
}