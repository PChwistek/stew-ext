import { millisecondsToDigitalClock } from '../containers/utils/utils'

describe('time utilities', () => {
  it('should convert 1000 milleseconds to 00:01', () => {
    const milleseconds = 1000
    const result = millisecondsToDigitalClock(milleseconds)
    expect(result).toEqual('00:01')
  })
})