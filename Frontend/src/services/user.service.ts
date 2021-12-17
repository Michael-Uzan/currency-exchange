import { ICredentials } from '../interface/ICredentials'
import { storageService } from './async-storage.service'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

// const USER_KEY = 'usersDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// const GUEST_USER_ID = '615f4586c375bb154681275d'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    // getUsers,
    // getById,
    // remove,
    // update,
    // filterUserBoards,
    // isBoardStarred,
    // toggleStarBoard,
    // getGuestUser
}

async function login(userCred: ICredentials) {
    const user = await httpService.post('auth/login', userCred)
    if (!user) {
        throw new Error('login service error')
    }
    return _saveLocalUser(user)

}
async function signup(userCred: ICredentials) {
    // userCred.initials = _getUserInitials(userCred.fullname)
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


// async function getById(userId) {
//     const user = await httpService.get(`user/${userId}`)
//     return user;
// }
// function remove(userId) {
//     return storageService.remove(USER_KEY, userId)
// }

// async function update(user) {
//     await storageService.put(USER_KEY, user)
//     if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
//     return user;
// }





