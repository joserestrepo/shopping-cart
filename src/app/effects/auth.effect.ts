import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { exhaustMap } from 'rxjs/operators';

import { AuthActions } from './../actions'
import { AuthService } from './../services/auth.service'

@Injectable()
export class AuthEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap((actions: any) => this.authService.loginEmailUser(actions.email, actions.password)
                .then((login: any) => AuthActions.loginSuccess({ login }))
                .catch(error => AuthActions.loginFailed({ error: { code: error?.code, message: error?.message} }))
            )
        )
    )

    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            exhaustMap((actions: any) => this.authService.sigUpEmail(actions.email, actions.password, actions.name)
                .then((register: any) => AuthActions.registerSuccess({ register }))
                .catch(error => AuthActions.registerFailed({ error }))
            )
        )
    )

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            exhaustMap((actions: any) => this.authService.logoutUser()
                .then((logout: any) => AuthActions.logoutSuccess({ logout: { success: true, message: 'Logout success' } }))
                .catch(error =>  AuthActions.logoutFailed({ error }))
            )
        )
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
    ) { }
}