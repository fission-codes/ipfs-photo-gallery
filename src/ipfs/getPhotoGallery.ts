import * as React from 'react';
import useAuth from '../components/Auth/useAuth';
import { BaseLinks, File, Tree } from 'webnative/fs/types';

export const ipfsProvider = process.env.REACT_APP_INTERPLANETARY_FISSION_URL || 'https://hostless.dev';

function isTree(path: File | Tree | null): path is Tree {
    return path !== undefined && (path as Tree).createChildFile !== undefined;
}

function usePhotos() {
    const {fs, appPath} = useAuth();
    const [photos, setPhotos] = React.useState<BaseLinks>();
    React.useEffect(() => {
        async function fetchPhotos() {
            if (fs !== undefined && appPath !== undefined) {
                if (await fs.exists(appPath)) {
                    console.log('exists')
                    try {
                        console.log('trying')
                        const result = await fs.ls(appPath)
                        console.log('fetchPhotos', result);
                        setPhotos(result);
                    } catch (err) {
                        console.error(err)
                    }
                } else {
                    console.log('Path does not exist')
                }
            }
        }

        fetchPhotos().then(r => console.log('fetchedPhotos', r))
    }, [fs, appPath])
    return {photos, isTree}
}

export default usePhotos;
