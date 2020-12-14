import FileSystem from 'webnative/fs/filesystem';

export const pathExists = async (fs: FileSystem, appPath: string) => {
    return await fs.exists(appPath)
}

export const createPhotoGalleryPath = async (fs: FileSystem, appPath: string) => {
    async function createPath() {
        try {
            await fs.mkdir(appPath)
            await fs.publish()
        } catch (err) {
            console.error('createPathError', err)
        }
    }

    createPath().then(() => console.log('createPath'));
}
