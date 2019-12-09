import axios from 'axios';

export const ipfsProvider = process.env.INTERPLANETARY_FISSION_URL || 'https://runfission.com';
const username = process.env.INTERPLANETARY_FISSION_USERNAME;
const password = process.env.INTERPLANETARY_FISSION_PASSWORD;
const auth = username && password && {username, password};

const getPhotoGalleryCids = async () => {
    if (auth) {
        try {
            return await axios.get(ipfsProvider + '/ipfs/cids/', {auth});
        } catch (error) {
            console.log(error);
        }
    }
};

export const getPhotos = async () => {
    const photos = await getPhotoGalleryCids();
    return photos && photos.data;
};
