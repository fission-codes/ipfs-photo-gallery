import * as React from 'react';
import useAuth from '../components/Auth/useAuth';
import { File, Tree } from 'webnative/fs/types';

export const ipfsProvider = process.env.REACT_APP_INTERPLANETARY_FISSION_URL || 'https://hostless.dev';

function isTree(path: File | Tree | null): path is Tree {
    return path !== undefined && (path as Tree).createChildFile !== undefined;
}

function usePhotos() {
    const { fs } = useAuth();
    const [photos, setPhotos] = React.useState<File | Tree | null>();
    React.useEffect(() => {
        async function fetchPhotos() {
            if (fs !== undefined) {
                try {
                    const result = await fs.publicTree.get("public/photo-gallery")
                    console.log('fetchPhotos', result);
                    setPhotos(result);
                } catch (err) {
                    console.error(err)
                }
            }
        }
        fetchPhotos()
    }, [fs])
    return { photos, isTree }
}

export default usePhotos;
