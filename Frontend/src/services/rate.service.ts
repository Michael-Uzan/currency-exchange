import IRateProperties from "../interface/IRateProperties.interface";
import { httpService } from "./http.service";

export const RateService = {
    getRate
}

async function getRate(rateProperties: IRateProperties) {
    const { srcCoin, desCoin } = rateProperties
    return httpService.get(`rate/${srcCoin}/${desCoin}`, null)

    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         return resolve(2)
    //     }, 400)
    // })

}