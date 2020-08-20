import * as React from 'react'
import * as sdk from 'webnative'
import { AuthSucceeded, FulfilledScenario, State } from 'webnative'

function isAuthSucceeded(state: State | undefined): state is AuthSucceeded {
    return state !== undefined && (state as AuthSucceeded).authenticated === true;
}

function useAuth() {
    const [fulfilledScenario, setFulfilledScenario] = React.useState<FulfilledScenario>();
    const authScenario = fulfilledScenario?.scenario;
    const authState = fulfilledScenario?.state
    let username = '';

    if (isAuthSucceeded(authState)) {
        username = authState.username
    }

    React.useEffect(() => {
        async function fetchScenario() {
            try {
                const result = await sdk.initialise({});
                setFulfilledScenario(result)
            } catch (err) {
                console.error(err)
            }
        }
        fetchScenario()
    }, [])

    return { authScenario, authState, username };
}

export default useAuth;
