// import axios from 'axios';
// import {Auth} from "@fission-suite/client";
//
// export const ipfsProvider = process.env.REACT_APP_INTERPLANETARY_FISSION_URL || 'https://hostless.dev';
//
// const getPhotoGalleryCids = async (auth: Auth) => {
//     if (auth) {
//         try {
//             return await axios.get(ipfsProvider + '/ipfs/cids/', {auth});
//         } catch (error) {
//             console.log(error);
//         }
//     }
// };
//
// export const getPhotos = async (auth: Auth) => {
//     const photos = await getPhotoGalleryCids(auth);
//     return photos && photos.data;
// };
