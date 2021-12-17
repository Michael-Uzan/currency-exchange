import { ICredentials } from "../../interface/ICredentials.js";
import { eventBusService } from "../../services/event-bus.service";
import { userService } from "../../services/user.service";

export function onLogin(credentials: ICredentials) {
    return async (dispatch: Function) => {
        try {
            const user = await userService.login(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            eventBusService.showSuccessMsg(`Welcome ${user.username}!`)
            return user
        } catch (err) {
            console.log('Cannot login', err)
            eventBusService.showErrorMsg('Sorry cannot Login!')
            throw err
        }
    }
}


export function onSignup(credentials: ICredentials) {
    return async (dispatch: Function) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({
                type: 'SET_USER',
                user
            })
            eventBusService.showSuccessMsg(`Welcome ${user.username}!`)
        } catch (err) {
            console.log('Cannot signup', err)
            eventBusService.showErrorMsg('Sorry cannot Signup!')
        }
    }
}

export function onLogout() {
    return async (dispatch: Function) => {
        try {
            const user = await userService.logout()
            dispatch({
                type: 'SET_USER',
                user: null
            })
        } catch (err) {
            console.log('Cannot logout', err)
            eventBusService.showErrorMsg('Sorry cannot Logout!')
        }
    }
}

// export function loadUsers() {
//     return async dispatch => {
//         try {
//             dispatch({ type: 'LOADING_START' })
//             const users = await userService.getUsers()
//             dispatch({ type: 'SET_USERS', users })
//         } catch (err) {
//             console.log('UserActions: err in loadUsers', err)
//         } finally {
//             dispatch({ type: 'LOADING_DONE' })
//         }
//     }
// }

// export function updateUser(user) {
//     return async dispatch => {
//         try {
//             await userService.update(user);
//             dispatch({ type: 'SET_USER', user });
//         } catch (err) {
//             console.log('err in updateUser:', err);
//         }
//     }
// }

// export function removeUser(userId) {
//     return async dispatch => {
//         try {
//             await userService.remove(userId)
//             dispatch({ type: 'REMOVE_USER', userId })
//         } catch (err) {
//             console.log('UserActions: err in removeUser', err)
//         }
//     }
// }


// export function loginAsGuest() {
//     const guestCreds = {
//         username: "pandaguest",
//         password: "123"
//     }
//     try {
//         return onLogin(guestCreds)
//     } catch (err) {
//         console.log('error login as guest');
//     }
// }


