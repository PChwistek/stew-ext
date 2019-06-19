//import initStoryshots from '@storybook/addon-storyshots'

// initStoryshots({ /* configuration options */ }) 
describe('Examining the syntax of Jest tests', () => {
   
  it('sums numbers', () => {
    expect(1 + 2).toEqual(3)
    expect(2 + 2).toEqual(4)
  })

})