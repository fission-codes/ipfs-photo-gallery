import * as React from 'react';
import { PhotoUpload } from './PhotoUpload';
import PhotoGalleryGrid from './PhotoGalleryGrid';
import usePhotos from './usePhotos';

export const Photos: React.FC = () => {
    const { addPhotosToIpfs, photos } = usePhotos();
    return (
        <>
            <PhotoUpload addPhotosToIpfs={addPhotosToIpfs}/>
            <PhotoGalleryGrid photos={photos}/>
        </>
    )
}
