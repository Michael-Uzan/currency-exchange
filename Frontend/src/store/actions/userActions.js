export function spendBalance(spendAmount) {
  return (dispatch, getState) => {
    const { loggedInUser } = getState().userModule
    if (loggedInUser.balance < spendAmount) alert('You dont have enough money!')
    dispatch({ type: 'SPEND_BALANCE', spendAmount })
  }
}