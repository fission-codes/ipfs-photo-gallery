import * as React from 'react';
import useAuth, { isAuthSucceeded } from '../Auth/useAuth';
import FileSystem from 'webnative/fs/filesystem';
import { FileContent } from 'webnative/ipfs';
import { BaseLinks } from 'webnative/fs/types';

function usePhotos() {
    const {state} = useAuth();
    const [photos, setPhotos] = React.useState<FileContent[]>([])
    const fs: FileSystem | undefined = isAuthSucceeded(state) ? state.fs : undefined
    const appPath = isAuthSucceeded(state)
    && state.fs !== undefined
    && state.fs.appPath !== undefined
        ? state.fs.appPath() : undefined

    const writePhotos = async (photos: File[]) => {
        if (fs !== undefined) {
            setPhotos(p => [...photos, ...p])
            return Promise.all(photos.map(async (photo) => {
                try {
                    await fs.add(`${appPath}/${photo.name}`, photo, {publish: true})
                        .catch(r => console.error(r))
                } catch (err) {
                    console.error('createPhotoGalleryPath', err);
                }
            }))
        }
    }

    const addPhotos = (photos: File[]) => {
        writePhotos(photos).catch(r => console.error(r))
    }

    React.useEffect(() => {
        const fetchPhotos = async () => {
            console.log('fetching')
            const fs: FileSystem | undefined = isAuthSucceeded(state) ? state.fs : undefined
            const appPath = isAuthSucceeded(state)
            && state.fs !== undefined
            && state.fs.appPath !== undefined
                ? state.fs.appPath() : undefined

            let photos: FileContent[] = [];
            let baseLinks: BaseLinks | undefined

            if (fs !== undefined && appPath !== undefined) {
                baseLinks = await fs.ls(appPath);
                if (baseLinks !== undefined) {
                    try {
                        const links = Object.entries(baseLinks)
                        return await Promise.all(links.sort((a, b) =>
                            (b[1].mtime ?? 0) - (a[1].mtime ?? 0)
                        )
                            .map(async ([name, _]) =>
                                await fs?.cat(`${appPath}/${name}`) as FileContent));
                    } catch (err) {
                        console.error(err)
                    }
                }
            }
            return photos
        }
        fetchPhotos().then(setPhotos).catch(r => console.error(r))
    }, [state])

    return {photos, addPhotos, state}
}

export default usePhotos;
