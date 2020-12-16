import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, fade, makeStyles, Typography } from '@material-ui/core';

interface IPhotoUploadProps {
    addPhotos: (photos: File[]) => void;
    noPhotos: boolean;
}

function setImmediate(callback: (...args: any[]) => void, ...args: any[]) {
    let cancelled = false;
    Promise.resolve().then(() => cancelled || callback(...args));
    return () => {
        cancelled = true;
    };
}

export const PhotoUpload: React.FC<IPhotoUploadProps> = ({addPhotos, noPhotos}) => {
    const onDrop = React.useCallback(files => addPhotos(files), [addPhotos]);
    const {getRootProps, getInputProps} = useDropzone({accept: 'image/jpeg, image/png, image/gif', multiple: true, onDrop});
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        let count = 0;
        let cancelImmediate = () => {};
        const onDragEnter = (e: DragEvent) => {
            setIsVisible(true);
            e.stopPropagation();
            e.preventDefault();
            if(count === 0) {
                setIsVisible(true)
            }
            ++count;
            return false;
        }
        const onDragOver = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        const onDragLeave = (e: DragEvent) => {
            e.stopPropagation();
            e.preventDefault();
            cancelImmediate = setImmediate(() => {
                --count;
                if(count === 0) {
                    setIsVisible(false)
                }
            })
            return false;
        }
        const onWindowDrop = (e: DragEvent) => {
            e.preventDefault();
            cancelImmediate();
            if(count > 0) {
                count = 0;
                setIsVisible(false)
            }
            return false;
        }
        document.addEventListener('dragleave', onDragLeave);
        document.addEventListener('dragenter', onDragEnter);
        document.addEventListener('dragover', onDragOver);
        document.addEventListener('drop', onWindowDrop);
        return () => {
            document.removeEventListener('dragleave', onDragLeave);
            document.removeEventListener('dragenter', onDragEnter);
            document.removeEventListener('dragover', onDragOver);
            document.removeEventListener('drop', onWindowDrop);
        };
    }, []);

    const useStyles = makeStyles(theme => ({
        '@global': {
            '@keyframes fadeIn': {
                from: {opacity: 0},
                to: {opacity: 1},
            },
        },
        paper: {
            cursor: 'pointer',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            animation: `$fadeIn 1s ${theme.transitions.easing.easeInOut}`,
            visibility: (noPhotos || isVisible) ? 'visible' : 'hidden',
            padding: theme.spacing(8),
            transition: `opacity .325s ${theme.transitions.easing.easeInOut}`,
            opacity: (noPhotos || isVisible) ? 1 : 0,
            textAlign: 'center',
            borderRadius: 0,
            backgroundColor: fade(theme.palette.background.default, noPhotos ? 0.5 : 0.8),
            backdropFilter: `blur(${noPhotos ? 5 : 15}px)`,
            boxSizing: 'border-box',
            border: `2px dashed ${theme.palette.primary.main}`,
        },
        text: {
            ...theme.typography.h5,
            color: theme.palette.text.primary,
        },
        img: {
            maxWidth: '100%',
            height: 'auto',
        }
    }));

    const classes = useStyles();

    return (
        <Box {...getRootProps()} className={classes.paper}>
            <input {...getInputProps()} />
            <Typography variant={'body1'} className={classes.text}>
                Drag and drop images to pin them to your Fission Drive
            </Typography>
        </Box>
    )
};
