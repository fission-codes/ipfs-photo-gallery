import useAuth from '../components/Auth/useAuth';

function usePhotoUpload() {
    const {fs, appPath} = useAuth()
    const addPhotosToIpfs = (photos: File[]) => {
        photos.map(async (photo) => {
            try {
                await fs?.write(`${appPath}/${photo.name}`, photo)
                    .then(r => console.log('uploaded photo: ', r, photo));
            } catch (err) {
                console.error('createPhotoGalleryPath', err);
            }
        })
    };
    return {addPhotosToIpfs}
}

export default usePhotoUpload;
