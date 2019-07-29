
export default class Clock {
  contructor() {
    this.interval = null
    this.terminationTime = null
    this.intervalAction = () => {}
  }

  setIntervalAction(anIntervalAction) {
    this.intervalAction = anIntervalAction
  }

  setClock(milliseconds) {
    
    this.scheduledTime = Date.now() + milliseconds
    const sTime = this.scheduledTime
    const timerLogic = () => { // binded this
      const timeLeft = sTime - Date.now()
      this.intervalAction()
      if(timeLeft <= 0) {
        this.clearTimer()
      }
    }
  
    this.interval = setInterval(timerLogic, 1000)
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