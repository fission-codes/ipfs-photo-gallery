import * as React from 'react'
import * as sdk from 'webnative'

function useAuth() {
    const [auth, setAuth] = React.useState();

    React.useEffect(() => {
        async function fetchScenario() {
            try {
                const { scenario } = await sdk.initialise({});
                setAuth(scenario)
            } catch (err) {
                console.error(err)
            }
        }
        fetchScenario()
    }, [])

    return { auth };
}

export default useAuth;
