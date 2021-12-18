import { ICredentials } from '../interface/ICredentials'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
}

async function login(userCred: ICredentials) {
    const user = await httpService.post('auth/login', userCred)
    if (!user) {
        throw new Error('login service error')
    }
    return _saveLocalUser(user)
}

async function signup(userCred: ICredentials) {
    const user = await httpService.post('auth/signup', userCred)
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await httpService.post('auth/logout', null)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

function _saveLocalUser(user: ICredentials) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}