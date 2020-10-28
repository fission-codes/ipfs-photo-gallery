import * as React from 'react';
import useAuth from '../components/Auth/useAuth';
import { BaseLinks, File, Tree } from 'webnative/fs/types';
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
                        console.log('there was a result')
                        const photos = Object.entries(result)
                        const data = await Promise.all(photos.map(([name, _]) => {
                            return fs.cat(`${appPath}/${name}`)
                        }))
                        console.log('appPath', appPath)
                        console.log(result)
                        console.log(photos)
                        console.log(data)
                        setPhotos(data)
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
