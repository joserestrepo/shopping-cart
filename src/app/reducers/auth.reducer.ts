import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions'

export const initialState: any = {
    isloadingLogin: false,
    isloadingLogOut: false,
    isloadingRegister: false

};

const _authReducer = createReducer(
    initialState,
    on(AuthActions.login, (state) => {
        return (
            {
                ...state,
                isloadingLogin: true
            }
        )
    } ),
    on(AuthActions.loginSuccess, (state, actions) => {
        return (
            {
                ...state,
                login: actions.login,
                isloadingLogin: false
            }
        )
    }),
    on(AuthActions.loginFailed, (state, actions) => { 
        return (
            {
                ...state,
                errorLogin: actions.error,
                isloadingLogin: false
            }
        )
    }),

    on(AuthActions.logout, (state) => {
        return (
            {
                ...state,
                isloadingLogOut: true
            }
        )
    } ),
    on(AuthActions.logoutSuccess, (state, actions) => {
        return (
            {
                ...state,
                logout: actions.logout,
                isloadingLogOut: false
            }
        )
    }),
    on(AuthActions.logoutFailed, (state, actions) => { 
        return (
            {
                ...state,
                errorLogout: actions.error,
                isloadingLogOut: false
            }
        )
    }),

    on(AuthActions.register, (state) => {
        return (
            {
                ...state,
                isloadingRegister: true
            }
        )
    }),
    on(AuthActions.registerSuccess, (state, actions) => {
        return (
            {
                ...state,
                register: actions.register,
                isloadingRegister: false
            }
        )
    }),
    on(AuthActions.registerFailed, (state, actions) => { 
        return (
            {
                ...state,
                errorRegister: actions.error,
                isloadingRegister: false
            }
        )
    })
)

export function authReducer(state: any, action: any) {
    return _authReducer(state, action)
}