import * as React from 'react'
import * as sdk from 'webnative'
import { AuthSucceeded, FulfilledScenario, State } from 'webnative'
import FileSystem from 'webnative/fs';

function isAuthSucceeded(state: State | undefined): state is AuthSucceeded {
    return state !== undefined && (state as AuthSucceeded).authenticated === true;
}

function useAuth() {
    const [fulfilledScenario, setFulfilledScenario] = React.useState<FulfilledScenario>();
    const authScenario = fulfilledScenario?.scenario;
    const authState = fulfilledScenario?.state
    let username = '';
    let fs: FileSystem | undefined;

    console.log('fulfilledScenario', fulfilledScenario);

    if (isAuthSucceeded(authState)) {
        username = authState.username
        fs = authState.fs
    }

    React.useEffect(() => {
        async function fetchScenario() {
            try {
                const result = await sdk.initialise({});
                setFulfilledScenario(result)
            } catch (err) {
                console.error('fetchScenarioError', err)
            }
        }
        fetchScenario()
    }, [])

    return { authScenario, authState, username, fs };
}

export default useAuth;
