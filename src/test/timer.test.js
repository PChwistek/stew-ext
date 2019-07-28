import Timer from '../containers/background/timer'

//describe block

describe('Timer...', () => {
  it('should be in the background script', () => {
    expect(Timer).toBeTruthy()
  })
  const testTimer = new Timer()

  it('should have some class variables', () => {
    expect(testTimer.interval).toBeDefined()
    expect(testTimer.terminationDate).toBeDefined()
  })

  it('should have some setTimer and time when it terminates', () => {
    expect(testTimer.setTimer).toBeDefined()
    testTimer.setTimer(1000)
    const terminationDate = Date.now() + 1000
    const timeLeft = testTimer.getTerminationDate()
    expect(timeLeft - terminationDate).toBeLessThan(100)
  })

  it('reset should clear the timer', () => {
    expect(testTimer.resetTimer).toBeDefined()
    testTimer.resetTimer()
    expect(testTimer.getInterval()).toBeNull()
    expect(testTimer.getTerminationDate()).toBeNull()
  })

})