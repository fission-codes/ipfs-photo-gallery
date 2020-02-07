import * as React from 'react';
import {IAuthContext, IAuthState} from "./AuthTypes";
import authReducer from "./AuthReducer";

const initAuthState: IAuthState = {
    auth: {
        username: '',
        password: '',
    },
    verified: false
};

const initAuthContext: IAuthContext = {
    state: initAuthState,
    dispatch: () => ({}),
};

export const AuthContext = React.createContext<IAuthContext>(initAuthContext);

export const AuthProvider: React.FC = props => {
    const [state, dispatch] = React.useReducer(authReducer, initAuthState);
    const value = { state, dispatch };
    return <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
};
