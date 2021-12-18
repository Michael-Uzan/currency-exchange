import IRateProperties from "../interface/IRateProperties.interface";
import { httpService } from "./http.service";

export const rateService = {
    getRate,
    getRates,
}

async function getRate(rateProperties: IRateProperties) {
    const { srcCoin, desCoin } = rateProperties
    return httpService.get(`rate/${srcCoin}/${desCoin}`, null)
}

async function getRates() {
    return httpService.get('rate/', null)
}

