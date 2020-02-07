import * as React from 'react';
import {AuthContext} from "./AuthContext";
import {Auth, verify} from '@fission-suite/client';
import {AuthActions} from "./AuthTypes";

function useAuth() {

    const { state, dispatch } = React.useContext(AuthContext);
    const { auth, verified } = state;

    const sessionState = sessionStorage.getItem('state');

    React.useEffect(() => {
    }, [sessionState, state, dispatch]);

    function checkAuth(auth: Auth) {
        const checked = verify(auth)
            .then((verified: Boolean) => {
                dispatch({
                    type: AuthActions.AUTHENTICATE,
                    payload: { auth, verified },
                })
            })
            .finally(() => console.log(state))
            .catch((reason => alert(reason)));
        console.log(checked);
    }

    return { verified, auth, checkAuth };

}

export default useAuth;
