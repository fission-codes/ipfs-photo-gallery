import * as React from 'react';
import LoginForm from './LoginForm';
import { CircularProgress, Container, createMuiTheme, ThemeProvider } from '@material-ui/core';
import * as sdk from 'webnative';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PhotoUpload } from '../Photos/PhotoUpload';
import PhotoGalleryGrid from '../Photos/PhotoGalleryGrid';
import usePhotos from '../Photos/usePhotos';

const AuthLayout: React.FC = () => {
    const { addPhotos, photos, state } = usePhotos();
    const theme = createMuiTheme();

    if (state !== undefined ) {
        switch (state.scenario) {
            case sdk.Scenario.AuthSucceeded:
            case sdk.Scenario.Continuation:
                return (
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <Container maxWidth={false}>
                            <PhotoUpload addPhotos={addPhotos} noPhotos={photos.length === 0} />
                            <PhotoGalleryGrid photos={photos} />
                        </Container>
                    </ThemeProvider>
                )
            case sdk.Scenario.NotAuthorised:
                return <LoginForm/>;
            default:
                return <CircularProgress/>;
        }
    }
    return null
};

export default AuthLayout;
