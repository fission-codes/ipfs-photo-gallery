import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {addPhotosToIpfs} from "../../ipfs/addPhoto";
import {makeStyles, Paper, Typography} from "@material-ui/core";

export const PhotoUpload: React.FC = () => {
    const onDrop = useCallback(files => addPhotosToIpfs(files), []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: 'image/jpeg, image/png, image/gif', onDrop});

    const useStyles = makeStyles(theme => ({
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            margin: theme.spacing(4, 0),
            padding: theme.spacing(2),
            textAlign: 'center',
            ...isDragActive && { backgroundColor: theme.palette.primary.main },
        },
        text: {
            color: theme.palette.primary.contrastText,
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
            <Typography variant={'body1'} color={isDragActive ? 'inherit' : 'primary'}>
                Drag and drop images to pin them to the InterPlanetary File System
            </Typography>
        </Paper>
    )
};
