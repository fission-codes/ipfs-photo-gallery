import FileSystem from 'webnative/fs/filesystem';
import { AppPath } from '../components/Auth/useAuth';

export const createPhotoGalleryPath = async (fs?: FileSystem, appPath?: AppPath) => {

    async function createPath() {
        if (fs !== undefined && appPath !== undefined && await fs.exists(appPath()).catch(r => console.error(r))) {
            try {
                await fs.mkdir(appPath())
                await fs.publish()
            } catch (err) {
                console.error('createPathError', err)
            }
        }
    }
    createPath().catch((r) => console.error(r));
}
