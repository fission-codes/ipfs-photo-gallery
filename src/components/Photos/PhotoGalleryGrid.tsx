import * as React from 'react';
import { Box, ButtonBase, fade, makeStyles, RootRef } from '@material-ui/core';
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
        }, 300);
    };

    React.useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setBig(false)
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', () => undefined);
        };
    }, [big])

    const useStyles = makeStyles(theme => ({
        grid: {
            transition: 'max-width .2s ease-in-out'
        },
        button: {
            marginBottom: theme.spacing(3),
        },
        bigButton: {
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        bigFigure: {
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 99,
            boxSizing: 'border-box',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(8),
            backgroundColor: fade(theme.palette.background.default, 0.8),
            backdropFilter: 'blur(25px)',
            opacity: big ? 1 : 0,
        },
        figure: {
            margin: 0,
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
            <ButtonBase focusRipple className={classes.button} onClick={toggleBig}>
                <figure className={classes.figure}>
                    <img
                        src={URL.createObjectURL(new Blob([props.photo as BlobPart]))}
                        alt={''}
                        className={classes.img}
                        // onError={evt => (evt.target as HTMLImageElement).style.display = 'none'}
                    />
                </figure>
            </ButtonBase>
            {big && (
                <figure className={classes.bigFigure}>
                    <ButtonBase focusRipple className={classes.bigButton} onClick={toggleBig}>
                        <img
                            src={URL.createObjectURL(new Blob([props.photo as BlobPart]))}
                            alt={''}
                            className={classes.img}
                            // onError={evt => (evt.target as HTMLImageElement).style.display = 'none'}
                        />
                    </ButtonBase>
                </figure>
            )}
        </RootRef>
    )
};

const PhotoGalleryGrid: React.FC<{ photos: FileContent[] }> = ({photos}) => {
    const useStyles = makeStyles(theme => ({
        container: {
            position: 'relative',
            zIndex: 2,
            columns: 3,
            columnGap: theme.spacing(3),
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3),
        },
    }))
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            {photos.map((photo, i) => <Photo key={i} photo={photo}/>)}
        </Box>
    )
}

export default PhotoGalleryGrid;
