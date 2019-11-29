import { add } from '@fission-suite/client'
import {auth} from "./getPhotoGallery";

export const addPhotosToIpfs = (photos: File[]) => {
    photos.map(async (photo) => {
        if (auth) {
            try {
                await add(photo, auth);
            } catch (error) {
                throw new Error('Could not upload this photo');
            }
        } else {
            alert('User not authenticated');
        }
    })
};
