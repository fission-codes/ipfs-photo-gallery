import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { makeStyles, Paper, Typography } from '@material-ui/core';

interface IPhotoUploadProps {
    addPhotos: (photos: File[]) => void;
}

export const PhotoUpload: React.FC<IPhotoUploadProps> = ({ addPhotos }) => {
    const onDrop = useCallback(files => addPhotos(files), [addPhotos]);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: 'image/jpeg, image/png, image/gif', multiple: true, onDrop});
    const useStyles = makeStyles(theme => ({
        paper: {
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            marginBottom: theme.spacing(4),
            marginTop: theme.spacing(4),
            padding: theme.spacing(8),
            transition: 'padding 0.125s ease-in-out',
            textAlign: 'center',
            backgroundColor: isDragActive ? theme.palette.primary.main : theme.palette.background.paper,
        },
        text: {
            color: isDragActive ? theme.palette.primary.contrastText : theme.palette.text.secondary,
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
