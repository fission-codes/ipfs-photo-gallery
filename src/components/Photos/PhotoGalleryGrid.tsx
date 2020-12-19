import * as React from 'react';
import { Box, ButtonBase, fade, makeStyles } from '@material-ui/core';
import { FileContent } from 'webnative/ipfs';
import Resizer from 'react-image-file-resizer';

interface Props {
    src: FileContent,
    setBig: () => void
}

const Photo: React.FC<Props> = (props) => {
    const [url, setUrl] = React.useState<string | undefined>()

    const src = props.src

    React.useEffect(() => {
        const setSrcUrl = async () => {
            Resizer.imageFileResizer(new Blob([src as BlobPart]), 1200, 1800, 'JPEG', 90, 0,
                photo => setUrl(URL.createObjectURL(new Blob([photo as BlobPart]))),
                'blob'
            );
        }
        setSrcUrl().catch(console.error)
    }, [src])

    const useStyles = makeStyles(theme => ({
        '@global': {
            '@keyframes fadeIn': {
                from: {opacity: 0},
                to: {opacity: 1},
            },
        },
        grid: {
            transition: 'max-width .2s ease-in-out'
        },
        figure: {
            margin: 0,
            marginBottom: theme.spacing(3),
            animation: `$fadeIn .325s ${theme.transitions.easing.easeInOut}`,
        },
        img: {
            width: 'auto',
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
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
        <figure className={classes.figure}>
            <ButtonBase focusRipple onClick={props.setBig}>
                <img
                    src={url}
                    alt={''}
                    className={classes.img}
                />
            </ButtonBase>
        </figure>
    )
};

const PhotoGalleryGrid: React.FC<{ photos: FileContent[] }> = ({photos}) => {
    const [big, setBig] = React.useState<number | undefined>();
    const [bigUrl, setBigUrl] = React.useState<string | undefined>();

    React.useEffect(() => {
        setBigUrl(
            big !== undefined ?
                URL.createObjectURL(new Blob([photos[big] as BlobPart]))
                : undefined
        )

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setBig(undefined)
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', () => undefined);
        };
    }, [photos, big])

    const useStyles = makeStyles(theme => ({
        '@global': {
            '@keyframes fadeIn': {
                from: {opacity: 0},
                to: {opacity: 1},
            },
        },
        container: {
            position: 'relative',
            height: '100%',
            zIndex: 2,
            paddingTop: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            overflowY: 'auto',
        },
        grid: {
            columns: photos.length > 8 ? 3 : 2,
            columnGap: theme.spacing(3),
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
            bottom: 0,
            right: 0,
            zIndex: 200,
            boxSizing: 'border-box',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: theme.spacing(8),
            backgroundColor: fade(theme.palette.background.default, 0.85),
            backdropFilter: 'blur(25px)',
            opacity: big ? 1 : 0,
            animation: `$fadeIn .325s ${theme.transitions.easing.easeInOut}`,
        },
        img: {
            width: 'auto',
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '100%',
            objectFit: 'contain',
        },
    }))

    const classes = useStyles();

    return (
        <>
            <Box className={classes.container}>
                <Box className={classes.grid}>
                    {photos.map((photo, i) => {
                        return <Photo key={i} src={photo} setBig={() => setBig(i)}/>
                    })}
                </Box>
            </Box>
            {bigUrl && (
                <figure className={classes.bigFigure}>
                    <ButtonBase focusRipple className={classes.bigButton} onClick={() => setBig(undefined)}>
                        <img
                            src={bigUrl}
                            alt={''}
                            className={classes.img}
                        />
                    </ButtonBase>
                </figure>
            )}
        </>
    )
}

export default PhotoGalleryGrid;
