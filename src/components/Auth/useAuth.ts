import * as React from 'react'
import * as sdk from 'webnative'
import { AuthSucceeded, Continuation } from 'webnative'

export type AppPath = (path?: string | Array<string>) => string;

export function isAuthSucceeded(state: sdk.State | undefined): state is AuthSucceeded | Continuation {
    return state !== undefined &&
        (state.scenario === sdk.Scenario.AuthSucceeded || state.scenario === sdk.Scenario.Continuation);
}

function useAuth() {
    const [state, setState] = React.useState<sdk.State>();

    React.useEffect(() => {
        async function fetchState() {
            try {
                return await sdk.initialise({
                    permissions: {
                        app: {
                            name: 'Milione',
                            creator: 'awonderful.shop'
                        }
                    }
                })
                    .then(state => state !== undefined && setState(state), console.error);
            } catch (err) {
                console.error('fetchScenarioError', err)
            }
        }

        fetchState().then().catch(e => console.error(e))
    }, [])

    return {state};
}

export default useAuth;
