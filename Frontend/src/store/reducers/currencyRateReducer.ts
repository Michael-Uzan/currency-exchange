import { ICurrencyRate } from "../../interface/ICurrencyRate"
import { ICurrencyRateState } from "../../interface/ICurrencyRateState"

const INITIAL_STATE: ICurrencyRateState = {
  currencyRates: [],
  srcCurrCurrencyImg: '',
  desCurrCurrencyImg: '',
}

export function currencyRateReducer(state: ICurrencyRateState = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'SET_CURRENCY_RATES':
      return {
        ...state,
        currencyRates: action.currencyRates
      }
    case 'SET_IMGS':
      const srcCurrency: ICurrencyRate[] = state.currencyRates.filter((currencyRate: ICurrencyRate) => {
        return currencyRate.currency === action.rateProperties.srcCoin
      })
      const desCurrency: ICurrencyRate[] = state.currencyRates.filter((currencyRate: ICurrencyRate) => {
        return currencyRate.currency === action.rateProperties.desCoin
      })
      return {
        ...state,
        srcCurrCurrencyImg: srcCurrency[0]?.img,
        desCurrCurrencyImg: desCurrency[0]?.img,
      }
    // case 'SET_FILTER_BY':
    //   return {
    //     ...state,
    //     filterBy: action.filterBy
    //   }
    // case 'ADD_ROBOT':
    //   return {
    //     ...state,
    //     robots: [...state.robots, action.robot]
    //   }
    // case 'REMOVE_ROBOT':
    //   return {
    //     ...state,
    //     robots: state.robots.filter(robot => robot._id !== action.robotId)
    //   }
    // case 'UPDATE_ROBOT':
    //   const currRobot = state.currRobot._id === action.robot._id ? action.robot : state.currRobot
    //   return {
    //     ...state,
    //     robots: state.robots && state.robots.map(robot => robot._id === action.robot._id ? action.robot : robot),
    //     currRobot
    //   }
    default:
      return state
  }
}