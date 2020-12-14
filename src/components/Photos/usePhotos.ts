import * as React from 'react';
import useAuth, { isAuthSucceeded } from '../Auth/useAuth';
import { BaseLinks } from 'webnative/fs/types';
import FileSystem from 'webnative/fs/filesystem';
import { pathExists } from '../../ipfs/PathUtils';

export const ipfsProvider = process.env.REACT_APP_INTERPLANETARY_FISSION_URL || 'https://hostless.dev';

// function isTree(path: File | Tree | null): path is Tree {
//     return path !== undefined && (path as Tree).createChildFile !== undefined;
// }

function usePhotos() {
    const {state, fs, appPath} = useAuth()
    const [photos, setPhotos] = React.useState<string[]>([])
    // const [isFetching, setIsFetching] = React.useState(false)

    const fetchPhotos = React.useCallback(async () => {
        if (isAuthSucceeded(state)) {
            const fs = state.fs
            let appPath: string;
            if (fs !== undefined && fs.appPath !== undefined) {
                appPath = fs.appPath()
                if (await pathExists(fs, appPath)) {
                    console.log('exists')
                    let result: BaseLinks | undefined;
                    try {
                        console.log('trying')
                        result = await fs?.ls(appPath)
                        if (result !== undefined) {
                            const data = Object.entries(result)
                            const photos = await Promise.all(
                                data.sort((a, b) => {
                                    return (b[1].mtime ?? 0) - (a[1].mtime ?? 0)
                                })
                                .map(async ([name, _]) => {
                                const fileContent = await fs.cat(`${appPath}/${name}`)
                                    return URL.createObjectURL(new Blob([fileContent as BlobPart]));
                            }))
                            console.log('photos:', photos);
                            setPhotos(photos)
                            // setIsFetching(false)
                        }
                    } catch (err) {
                        console.error(err)
                    }
                } else {
                    console.log('Path does not exist')
                }
            }
        }
    }, [state])

    const writePhotos = async (fs: FileSystem, photos: File[]) => {
        return Promise.all(photos.map(async (photo) => {
            try {
                await fs.add(`${appPath}/${photo.name}`, photo, {publish: true}).then()
            } catch (err) {
                console.error('createPhotoGalleryPath', err);
            }
        }))
    }

    const addPhotosToIpfs = (photos: File[]) => {
        if (fs !== undefined) {
            writePhotos(fs, photos).then(() => fetchPhotos().then(() => console.log('fetched!')))
        }
    };

    React.useEffect(() => {
        fetchPhotos().then()
    }, [fetchPhotos])

    return {photos, fetchPhotos, addPhotosToIpfs}
}

export default usePhotos;
