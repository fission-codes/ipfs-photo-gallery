import * as React from 'react';
import useAuth, { isAuthSucceeded } from '../Auth/useAuth';
import FileSystem from 'webnative/fs/filesystem';
import { FileContent } from 'webnative/ipfs';
import { BaseLinks } from 'webnative/fs/types';

export enum PublishingState {
    waiting,
    started,
    finished,
}

function usePhotos() {
    const {state} = useAuth();
    const [photos, setPhotos] = React.useState<FileContent[]>([])
    const [publishing, setPublishing] = React.useState<PublishingState>(PublishingState.waiting)
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
                    await fs.add(`${appPath}/${photo.name}`, photo)
                        .then(console.log, console.error)
                } catch (err) {
                    console.error('createPhotoGalleryPath', err);
                }
            }))
        }
    }

    const addPhotos = (photos: File[]) => {
        setPublishing(PublishingState.started)
        writePhotos(photos)
            .then(async () => {
                await fs?.publish()
                    .then(() => setPublishing(PublishingState.finished), console.error)
            })
            .catch(r => console.error(r))
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

    React.useEffect(() => {
        if (publishing.valueOf() === PublishingState.finished.valueOf()) {
            setTimeout(() => {
                setPublishing(PublishingState.waiting)
            }, 5000)
        }
    }, [publishing])

    return {photos, addPhotos, state, publishing, setPublishing}
}

export default usePhotos;
