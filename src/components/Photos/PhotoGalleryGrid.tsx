import * as React from 'react';
import { Grid, makeStyles, RootRef } from '@material-ui/core';
import { FileContent } from 'webnative/ipfs';

const useStyles = makeStyles(theme => ({
    container: {
        position: 'relative',
        zIndex: 2,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    grid: {
        transition: 'max-width .2s ease-in-out'
    },
    figure: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        margin: 0,
        height: '100%',
        width: '100%',
    },
    img: {
        maxWidth: '100%',
        height: 'auto',
    },
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        height: '100%',
        width: '100%',
    }
}));

interface Props {
    photo: FileContent
}

const Photo: React.FC<Props> = (props) => {
    const [big, setBig] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>();
    const toggleBig = () => {
        setBig(!big);
        setTimeout(() => {
            if (ref) {
                ref.current && ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }
        }, 200);
    };
    const classes = useStyles();
    return (
        <RootRef rootRef={ref}>
            <Grid item xs={big ? 12 : 6} md={big ? 12 : 3} onClick={toggleBig} className={classes.grid}>
                <figure className={classes.figure}>
                    <img
                        src={URL.createObjectURL(new Blob([props.photo as BlobPart]))}
                        alt={''}
                        className={classes.img}
                        // onError={evt => (evt.target as HTMLImageElement).style.display = 'none'}
                    />
                </figure>
            </Grid>
        </RootRef>
    )
};

const PhotoGalleryGrid: React.FC<{ photos: FileContent[] }> = ({photos}) => {
    const classes = useStyles();
    return (
        <Grid container spacing={3} wrap={'wrap'} className={classes.container}>
            {photos.map((photo, i) => <Photo key={i} photo={photo}/>)}
        </Grid>
    )
}

export default PhotoGalleryGrid;
