import * as React from 'react';
import useAuth from '../components/Auth/useAuth';
import { BaseLink, BaseLinks, File, Tree } from 'webnative/fs/types';
import { FileContent } from 'webnative/ipfs';

export const ipfsProvider = process.env.REACT_APP_INTERPLANETARY_FISSION_URL || 'https://hostless.dev';

function isTree(path: File | Tree | null): path is Tree {
    return path !== undefined && (path as Tree).createChildFile !== undefined;
}

function usePhotos() {
    const {fs, appPath} = useAuth()
    const [photos, setPhotos] = React.useState<FileContent[]>()
    React.useEffect(() => {
        async function fetchPhotos() {
            if (fs !== undefined && appPath !== undefined) {
                if (await fs.exists(appPath)) {
                    console.log('exists')
                    let result: BaseLinks | undefined;
                    try {
                        console.log('trying')
                        result = await fs.ls(appPath)
                    } catch (err) {
                        console.error(err)
                    }
                    if (result !== undefined) {
                        const data = Object.entries(result)
                        const photos = await Promise.all(data.map(([name, _]) => {
                            return fs.cat(`${appPath}/${name}`)
                        }))
                        console.log('photos:', photos);
                        setPhotos(photos)
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
