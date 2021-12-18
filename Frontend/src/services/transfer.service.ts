import IRateProperties from "../interface/IRateProperties.interface";
import { ITransfer } from "../interface/ITransfer";
import { httpService } from "./http.service";

export const transferService = {
    addTransfer,
    getTransfers,
}

async function addTransfer(transfer: ITransfer) {
    return httpService.post(`transfer/`, transfer)
}

async function getTransfers() {
    return httpService.get('/transfer', null)
}