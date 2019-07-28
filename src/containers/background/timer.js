
export default class Timer {
  constructor() {
    this.interval = null
    this.terminationDate = null
  }

  setTimer(milliseconds) {
    this.terminationDate = Date.now() + milliseconds
    const sTime = this.terminationDate
    const timerLogic = () => { // binded this
      const timeLeft = sTime - Date.now()
      console.log('time left', timeLeft)
    }

    this.interval = setInterval(timerLogic, milliseconds)
  }

  resetTimer() {
    clearInterval(this.interval)
    this.interval = null
    this.terminationDate = null
  }

  getInterval() {
    return this.interval
  }

  getTerminationDate() {
    return this.terminationDate
  }
}