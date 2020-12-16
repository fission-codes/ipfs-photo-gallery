import * as React from 'react';
import LoginForm from './LoginForm';
import { Box, CircularProgress, Container, createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core';
import * as sdk from 'webnative';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PhotoUpload } from '../Photos/PhotoUpload';
import PhotoGalleryGrid from '../Photos/PhotoGalleryGrid';
import usePhotos from '../Photos/usePhotos';

const AuthLayout: React.FC = () => {
    const {addPhotos, photos, state} = usePhotos();

    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const theme = createMuiTheme({
        palette: {
            type: prefersDarkScheme.matches ? 'dark' : 'light'
        }
    });

    const useStyles = makeStyles(theme => ({
        box: {
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
    }))

    const classes = useStyles();

    const loading = (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box component={Container} className={classes.box}>
                <CircularProgress/>
            </Box>
        </ThemeProvider>
    )

    if (state !== undefined) {
        switch (state.scenario) {
            case sdk.Scenario.AuthSucceeded:
            case sdk.Scenario.Continuation:
                return (
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <PhotoUpload addPhotos={addPhotos} noPhotos={photos.length === 0}/>
                        {photos.length > 0 ? (<PhotoGalleryGrid photos={photos}/>) : loading}
                    </ThemeProvider>
                );
            case sdk.Scenario.NotAuthorised:
                return (
                    <ThemeProvider theme={theme}>
                        <CssBaseline/><LoginForm/>
                    </ThemeProvider>
                );
            default:
                return loading;
        }
    }
    return loading
};

export default AuthLayout;
