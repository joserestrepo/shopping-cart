import { createAction, props } from '@ngrx/store';

const login = createAction('LOGIN', props<{email: string, password: string}>());
const loginSuccess = createAction('LOGIN_SUCCESS', props<{login: any}>());
const loginFailed = createAction('LOGIN_FAILED', props<{error: any}>());

const logout = createAction('LOGOUT');
const logoutSuccess = createAction('LOGOUT_SUCCESS', props<{logout: any}>());
const logoutFailed = createAction('LOGOUT_FAILED', props<{error: any}>());

const register = createAction('REGISTER', props<{name: string, email: string, password: string}>());
const registerSuccess = createAction('REGISTER_SUCCESS', props<{register: any}>());
const registerFailed = createAction('REGISTER_FAILED', props<{error: any}>());

export default {
    login,
    loginSuccess,
    loginFailed,
    logout,
    logoutSuccess,
    logoutFailed,
    register,
    registerSuccess,
    registerFailed
}