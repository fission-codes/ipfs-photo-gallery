import axios from 'axios';

export const ipfsProvider = process.env.REACT_APP_INTERPLANETARY_FISSION_URL || 'https://hostless.dev';
const username = process.env.REACT_APP_INTERPLANETARY_FISSION_USERNAME;
const password = process.env.REACT_APP_INTERPLANETARY_FISSION_PASSWORD;
export const auth = username && password && {username, password};

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
