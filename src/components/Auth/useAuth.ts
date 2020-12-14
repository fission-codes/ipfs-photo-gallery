import * as React from 'react'
import * as sdk from 'webnative'
import { AuthSucceeded, Scenario, State } from 'webnative'
import FileSystem from 'webnative/fs/filesystem';
import { createPhotoGalleryPath, pathExists } from '../../ipfs/PathUtils';

export type AppPath = (path?: string | Array<string>) => string;

export function isAuthSucceeded(state: State | undefined): state is AuthSucceeded {
    return state !== undefined &&
        (state.scenario === Scenario.AuthSucceeded || state.scenario === Scenario.Continuation);
}

function useAuth() {
    const [state, setState] = React.useState<State>()
    const authScenario = state?.scenario;
    let fs: FileSystem | undefined = undefined;
    let username = '';
    let appPath;

    React.useEffect(() => {
        async function fetchState() {
            try {
                const result = await sdk.initialise({
                    permissions: {
                        app: {
                            name: 'IPFS Photo Gallery',
                            creator: 'Pat Dryburgh'
                        }
                    }
                });
                setState(result)
            } catch (err) {
                console.error('fetchScenarioError', err)
            }
        }

        fetchState().then(r => console.log(r))
    }, [])

    if (isAuthSucceeded(state)) {
        username = state.username
        fs = state.fs
        if (fs !== undefined && fs.appPath !== undefined) {
            appPath = fs.appPath()
            if (!pathExists(fs, appPath).then(() => undefined)) {
                createPhotoGalleryPath(fs, appPath).then(() => undefined)
            }
        }
    }

    return {state, fs, username, authScenario, appPath};
}

export default useAuth;
