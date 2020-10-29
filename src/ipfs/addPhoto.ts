import useAuth from '../components/Auth/useAuth';
import FileSystem from 'webnative/fs/filesystem';

function usePhotoUpload() {
    const {fs, appPath} = useAuth()

    async function publishPhoto() {
        try {
            await fs?.publish()
        } catch (err) {
            console.log('failed to publish', err)
        }
    }

    async function writePhotos(fs: FileSystem, photos: File[]) {
        return Promise.all(photos.map(async (photo) => {
            try {
                await fs.write(`${appPath}/${photo.name}`, photo).then(() => console.log('wrote', photo))
            } catch (err) {
                console.error('createPhotoGalleryPath', err);
            }
        }))
    }

    const addPhotosToIpfs = (photos: File[]) => {
        if (fs !== undefined) {
            writePhotos(fs, photos).then(r => {
                publishPhoto().then(() => console.log('uploaded photos: '))
            });
        }
    };
    return {addPhotosToIpfs}
}

export default usePhotoUpload;
