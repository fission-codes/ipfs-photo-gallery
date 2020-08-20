import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {addPhotosToIpfs} from "../../ipfs/addPhoto";
import {makeStyles, Paper, Typography} from "@material-ui/core";
import useAuth from "../Auth/useAuth";

export const PhotoUpload: React.FC = () => {
    // const { auth } = useAuth();
    // const onDrop = useCallback(files => addPhotosToIpfs(files, auth), [auth]);
    // const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: 'image/jpeg, image/png, image/gif', onDrop});
    //
    // const useStyles = makeStyles(theme => ({
    //     paper: {
    //         cursor: 'pointer',
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'stretch',
    //         justifyContent: 'center',
    //         marginBottom: theme.spacing(4),
    //         marginTop: theme.spacing(4),
    //         padding: theme.spacing(8),
    //         textAlign: 'center',
    //         backgroundColor: isDragActive ? theme.palette.primary.main : theme.palette.background.paper,
    //     },
    //     text: {
    //         color: isDragActive ? theme.palette.primary.contrastText : theme.palette.text.secondary,
    //     },
    //     img: {
    //         maxWidth: '100%',
    //         height: 'auto',
    //     }
    // }));
    // const classes = useStyles();
    //
    // return (
    //     <Paper className={classes.paper} {...getRootProps()}>
    //         <input {...getInputProps()} />
    //         <Typography variant={'body1'} className={classes.text}>
    //             Drag and drop images to pin them to the InterPlanetary File System
    //         </Typography>
    //     </Paper>
    // )
    return <></>;
};
