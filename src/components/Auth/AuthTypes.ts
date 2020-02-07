import * as React from 'react'
import {Auth} from "@fission-suite/client";

export enum AuthActions {
    AUTHENTICATE = 'AUTHENTICATE',
    UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS',
}

export interface IAuthState {
    verified: Boolean
    auth: Auth
}

export interface IAuthDispatch {
    type: AuthActions
    payload: IAuthState
}

export interface IAuthContext {
    state: IAuthState
    dispatch: React.Dispatch<IAuthDispatch>
}
