import React from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles, Paper, Typography, fade } from '@material-ui/core';

interface IPhotoUploadProps {
    addPhotos: (photos: File[]) => void;
    noPhotos: boolean;
}

export const PhotoUpload: React.FC<IPhotoUploadProps> = ({addPhotos, noPhotos}) => {
    const onDrop = React.useCallback(files => addPhotos(files), [addPhotos]);
    const [inWindow, setInWindow] = React.useState(false);
    const {getRootProps, getInputProps} = useDropzone({accept: 'image/jpeg, image/png, image/gif', multiple: true, onDrop});

    React.useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setInWindow(false)
            }
        };

        window.addEventListener('dragover', () => setInWindow(true));
        window.addEventListener('dragleave', () => setInWindow(false));
        window.addEventListener('drop', () => setInWindow(false));
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('dragover', () => undefined);
            window.removeEventListener('dragleave', () => undefined);
            window.removeEventListener('drop', () => undefined);
            window.removeEventListener('keydown', () => undefined);
        };
    }, []);

    React.useEffect(() => console.log(inWindow), [inWindow])

    const useStyles = makeStyles(theme => ({
        paper: {
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: inWindow ? 99 : 1,
            opacity: (noPhotos || inWindow) ? 1 : 0,
            transition: 'all 0.25s ease-in-out',
            padding: theme.spacing(8),
            textAlign: 'center',
            borderRadius: 0,
            backgroundColor: fade(theme.palette.background.default, 0.5),
            backdropFilter: 'blur(25px)',
            boxSizing: 'border-box',
            border: `2px dashed ${theme.palette.primary.main}`
        },
        text: {
            color: theme.palette.text.primary,
        },
        img: {
            maxWidth: '100%',
            height: 'auto',
        }
    }));

    const classes = useStyles();

    return (
        <Paper className={classes.paper} {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography variant={'body1'} className={classes.text}>
                Drag and drop images to pin them to your Fission Drive
            </Typography>
        </Paper>
    )
};
