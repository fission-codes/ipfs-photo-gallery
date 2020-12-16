import * as React from 'react';
import { Grid, makeStyles, RootRef } from '@material-ui/core';
import { FileContent } from 'webnative/ipfs';

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

    const useStyles = makeStyles(theme => ({
        grid: {
            transition: 'max-width .2s ease-in-out'
        },
        bigFigure: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: 'fixed',
            boxSizing: 'border-box',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(8),
            backgroundColor: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(25px)',
            opacity: big ? 1 : 0,
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
            width: 'auto',
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '100%',
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

    const classes = useStyles();
    return (
        <RootRef rootRef={ref}>
            <Grid item xs={6} md={3} onClick={toggleBig} className={classes.grid}>
                <figure className={classes.figure}>
                    <img
                        src={URL.createObjectURL(new Blob([props.photo as BlobPart]))}
                        alt={''}
                        className={classes.img}
                        // onError={evt => (evt.target as HTMLImageElement).style.display = 'none'}
                    />
                </figure>
                {big && (
                    <figure className={classes.bigFigure}>
                        <img
                            src={URL.createObjectURL(new Blob([props.photo as BlobPart]))}
                            alt={''}
                            className={classes.img}
                            // onError={evt => (evt.target as HTMLImageElement).style.display = 'none'}
                        />
                    </figure>
                )}
            </Grid>
        </RootRef>
    )
};

const PhotoGalleryGrid: React.FC<{ photos: FileContent[] }> = ({photos}) => {
    const useStyles = makeStyles(theme => ({
        container: {
            position: 'relative',
            zIndex: 2,
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
    }))
    const classes = useStyles();
    return (
        <Grid container spacing={3} wrap={'wrap'} className={classes.container}>
            {photos.map((photo, i) => <Photo key={i} photo={photo}/>)}
        </Grid>
    )
}

export default PhotoGalleryGrid;
