import Clock from '../containers/background/timer/Clock'

//describe block

const testClock = new Clock()
testClock.setIntervalAction(() => {})

describe('Timer...', () => {
  it('should be in the background script', () => {
    expect(Clock).toBeTruthy()
  })
})