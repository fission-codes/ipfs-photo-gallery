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
    const [fetching, setFetching] = React.useState(false)
    const [publishing, setPublishing] = React.useState<PublishingState>(PublishingState.waiting)
    const fs: FileSystem | undefined = isAuthSucceeded(state) ? state.fs : undefined
    const appPath = isAuthSucceeded(state)
    && state.fs !== undefined
    && state.fs.appPath !== undefined
        ? state.fs.appPath() : undefined

    const writePhotos = async (photos: File[]) => {
        if (fs !== undefined) {
            return Promise.all(photos.map(async (photo) => {
                setPhotos(p => [photo, ...p])
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
            if (isAuthSucceeded(state) && state.fs !== undefined && state.fs.appPath !== undefined) {
                setFetching(true)
                await state.fs.ls(state.fs.appPath())
                    .then(async baseLinks => {
                        await Promise.all(Object.entries(baseLinks)
                            .map(async ([name, _]) => {
                                if (state.fs !== undefined) {
                                    await state.fs.cat(`${appPath}/${name}`)
                                        .then(photo => setPhotos(p => [...p, photo]))
                                }
                            })
                        );
                    }, console.error);
            }
        }
    fetchPhotos().then(() => setFetching(false)).catch(r => console.error(r))
}

,
[state]
)

React.useEffect(() => {
    if (publishing.valueOf() === PublishingState.finished.valueOf()) {
        setTimeout(() => {
            setPublishing(PublishingState.waiting)
        }, 5000)
    }
}, [publishing])

React.useEffect(() =>
        console.log(
            `fetching: ${fetching}`,
            `publishing: ${publishing}`
        ),
    [fetching, publishing]
)

return {photos, addPhotos, state, publishing, setPublishing}
}

export default usePhotos;
