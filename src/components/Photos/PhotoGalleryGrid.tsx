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
    const [span, setSpan] = React.useState(10)
    const imgRef = React.createRef<HTMLImageElement>()
    const src = props.src

    React.useEffect(() => {
        const setSrcUrl = async () => {
            Resizer.imageFileResizer(new Blob([src as BlobPart]), 1200, 1800, 'JPEG', 80, 0,
                photo => {
                    console.log(photo)
                    setUrl(URL.createObjectURL(new Blob([photo as BlobPart])))
                },
                'blob'
            );
        }
        setSrcUrl().catch(console.error)
    }, [src])

    const onImgLoad = React.useCallback(() => {
        if (imgRef.current) {
            const height: number = imgRef.current.clientHeight;
            const spans = Math.floor((height));
            console.log(imgRef.current, spans)
            setSpan(spans);
        }
    }, [imgRef])

    React.useEffect(() => {
        imgRef.current && imgRef.current.addEventListener('load', onImgLoad)
    }, [imgRef, onImgLoad])

    React.useEffect(() => {
        window.addEventListener('resize', onImgLoad)
        return () => {
            window.removeEventListener('resize', onImgLoad)
        }
    }, [onImgLoad])

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
            // gridRowEnd: `span ${span}`,
            // height: span
        },
        button: {
            display: 'block',
            width: '100%',
            height: '100%',
        },
        img: {
            width: '100%',
            height: '100%',
            verticalAlign: 'top',
            objectFit: 'cover',
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
            <ButtonBase focusRipple onClick={props.setBig} className={classes.button}>
                <img
                    src={url}
                    alt={''}
                    className={classes.img}
                    ref={imgRef}
                />
            </ButtonBase>
        </figure>
)
};

const ROW_HEIGHT = 1;

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
            flex: '1 1 auto',
            height: '100%',
            zIndex: 2,
            overflowY: 'auto',
        },
        grid: {
            [theme.breakpoints.up(theme.breakpoints.values.sm)]: {
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(360px, 1fr))`,
                gridTemplateRows: `repeat(auto-fit, 0.75fr)`,
                gridGap: theme.spacing(3),
                padding: theme.spacing(3),
                paddingBottom: 0,
            },
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
