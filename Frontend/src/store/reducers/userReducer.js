const INITIAL_STATE = {
  loggedInUser: {
    name: 'Muki',
    balance: 100
  }
}
export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SPEND_BALANCE':
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          balance: state.loggedInUser.balance - action.spendAmount
        }
      }
    default:
      return state
  }
}