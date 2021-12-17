import IRateProperties from '../../interface/IRateProperties.interface';
import { rateService } from '../../services/rate.service'

export function getCurrencyRates() {
  return async (dispatch: Function) => {
    try {
      const currencyRates = await rateService.getRates()
      dispatch({ type: 'SET_CURRENCY_RATES', currencyRates })
    } catch (err) {
      console.log(err);
    }
  }
}

export function setCurrRateImgs(rateProperties: IRateProperties) {
  return (dispatch: Function) => {
    dispatch({ type: 'SET_IMGS', rateProperties })
  }
}

// srcCoin: 'ILS',
// desCoin: 'PHP',
// amount: 100


// export function getRobotById(robotId) {
//   return async dispatch => {
//     const robot = await rateService.getById(robotId)
//     dispatch({ type: 'SET_ROBOT', robot })
//   }
// }
// export function tryRobot(robotId) {
//   return async dispatch => {
//     const robot = await rateService.tryRobot(robotId)
//     dispatch({ type: 'UPDATE_ROBOT', robot })
//   }
// }

// export function removeRobot(robotId) {
//   return async dispatch => {
//     await rateService.remove(robotId)
//     dispatch({ type: 'REMOVE_ROBOT', robotId })
//   }
// }

