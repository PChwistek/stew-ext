const initialState = {
  running: false,
  time: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TIMER_START':
      return {
        ...state,
        running: true,
      }
    default:
      return state
  }
}