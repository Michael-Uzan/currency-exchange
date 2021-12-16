import IRateProperties from "../interface/IRateProperties.interface";
import { httpService } from "./http.service";

export const RateService = {
    getRate
}

async function getRate(rateProperties: IRateProperties) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(2)
        }, 400)
    })
}