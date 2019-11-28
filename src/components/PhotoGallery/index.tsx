import * as React from 'react';
import {getPhotos, ipfsProvider} from "../../ipfs/getPhotoGallery";

const PhotoGallery: React.FC = () => {
    const [photos, setPhotos] = React.useState();
    getPhotos().then(r => setPhotos(r));

    return (
        <>
            {photos && photos.map((p: string) => {
                return (
                    <img src={`${ipfsProvider}/ipfs/${p}`} alt={''} width={200} />
                )
            })}
            <br />
            <br />
            <br />
        </>
    )
};

export default PhotoGallery;
