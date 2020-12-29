import * as React from 'react';
import { isAuthSucceeded } from '../Auth/useAuth';
import { FileContent } from 'webnative/ipfs';
import { State } from 'webnative';

export enum PublishingState {
    waiting,
    started,
    finished,
}

function usePhotos(state?: State) {
    const [photos, setPhotos] = React.useState<FileContent[]>([])
    const [fetching, setFetching] = React.useState(false)
    const [publishing, setPublishing] = React.useState<PublishingState>(PublishingState.waiting)

    const writePhotos = async (photos: File[]) => {
        if (isAuthSucceeded(state)) {
            return Promise.all(photos.map(async (photo) => {
                if (state.fs !== undefined && state.fs.appPath !== undefined) {
                    await state.fs.add(`${state.fs.appPath()}/${photo.name}`, photo)
                        .then(() => setPhotos(p => [photo, ...p]), console.error)
                }
            }))
        }
    }

    const addPhotos = (photos: File[]) => {
        setPublishing(PublishingState.started)
        if (isAuthSucceeded(state)) {
            writePhotos(photos)
                .then(async () => {
                    await state?.fs?.publish()
                        .then(() => setPublishing(PublishingState.finished), console.error)
                }, console.error)
        }
    }

    React.useEffect(() => {
            const fetchPhotos = async () => {
                if (isAuthSucceeded(state) && state.fs !== undefined && state.fs.appPath !== undefined) {
                    setFetching(true)
                    await state.fs.ls(state.fs.appPath())
                        .then(async baseLinks => {
                            await Promise.all(Object.entries(baseLinks)
                                .filter(v => v[1].isFile)
                                .sort((a, b) =>
                                    (b[1].mtime ?? 0) - (a[1].mtime ?? 0)
                                )
                                .map(async ([name, _]) => {
                                    console.log(_.mtime)
                                    if (state.fs !== undefined && state.fs.appPath !== undefined) {
                                        await state.fs.cat(`${state.fs.appPath()}/${name}`)
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

    return {photos, addPhotos, publishing, setPublishing, fetching}
}

export default usePhotos;
