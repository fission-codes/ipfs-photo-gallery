import useAuth from '../components/Auth/useAuth';
import { createPhotoGalleryPath } from './photoGalleryDirectory';

function usePhotoUpload() {
    const { fs } = useAuth();

    const addPhotosToIpfs = (photos: File[]) => {
        createPhotoGalleryPath(fs).then(path =>
            photos.map(async (photo) => {
                try {
                    await fs?.write(`${path}/${photo.name}`, photo)
                        .then(r => console.log('uploaded photo: ', r, photo));
                } catch (err) {
                    console.error('createPhotoGalleryPath', err);
                }
            })
        )
    };
    return { addPhotosToIpfs }
}

export default usePhotoUpload;
