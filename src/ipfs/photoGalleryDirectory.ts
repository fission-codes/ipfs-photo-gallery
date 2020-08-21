import FileSystem from 'webnative/fs/filesystem';

const REACT_APP_INTERPLANETARY_PHOTO_GALLERY_PATH = 'public/photo-gallery';

function wfnsPathExists(fs?: FileSystem, path?: string) {
    async function checkPath() {
        if (fs !== undefined && path !== undefined) {
            try {
                const result = await fs.exists(path);
                return result
            } catch (err) {
                console.error('checkPathError', err)
            }
        }
    }
    checkPath().then(r => console.log(r));
    return false;
}

export async function createPhotoGalleryPath(fs?: FileSystem) {
    // async function createPath() {
    //     if (!wfnsPathExists(fs, REACT_APP_INTERPLANETARY_PHOTO_GALLERY_PATH)) {
    //         if (fs !== undefined) {
    //             try {
    //                 await fs.mkdir(REACT_APP_INTERPLANETARY_PHOTO_GALLERY_PATH)
    //             } catch (err) {
    //                 console.error('createPathError', err)
    //             }
    //         }
    //     }
    // }
    // createPath().then(() => console.log('createPath'));
    console.log('checkPathExists', wfnsPathExists(fs, REACT_APP_INTERPLANETARY_PHOTO_GALLERY_PATH))
    return REACT_APP_INTERPLANETARY_PHOTO_GALLERY_PATH;
}
