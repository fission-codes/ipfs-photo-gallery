import * as React from 'react'
import {AuthActions, IAuthDispatch, IAuthState} from "./AuthTypes";

const authReducer: React.Reducer<IAuthState, IAuthDispatch> = (state: IAuthState, action: IAuthDispatch) => {
    switch (action.type) {
        case AuthActions.AUTHENTICATE:
            return action.payload;
        case AuthActions.UPDATE_CREDENTIALS:
            return action.payload;
        default:
            throw new Error()
    }
};

export default authReducer;
