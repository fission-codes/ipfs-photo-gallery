import * as React from 'react'
import * as sdk from 'webnative'
import { FulfilledScenario, Scenario } from 'webnative';

function useAuth() {
    const [fulfilledScenario, setFulfilledScenario] = React.useState<FulfilledScenario>();
    const authScenario = fulfilledScenario?.scenario;
    const authState = fulfilledScenario?.state
    const username = authState?.username

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

    return { authScenario, authState };
}

export default useAuth;
