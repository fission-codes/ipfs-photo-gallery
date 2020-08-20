import * as React from 'react';
import { Box, Container, createMuiTheme, ThemeProvider, Typography } from '@material-ui/core';
// import {PhotoUpload} from "../PhotoUpload";
import PhotoGalleryGrid from '../PhotoGalleryGrid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useAuth from './useAuth';

const AuthenticatedLayout: React.FC = () => {
    // const initialUserSettingsCid = localStorage.getItem("userSettingsCID") || DEFAULT_CID;
    const { username } = useAuth();
    // const [cid, setCID] = React.useState(initialUserSettingsCid);
    // const [userSettings, setUserSettings] = React.useState();
    // const [isLoadingUserSettings, setIsLoadingUserSettings] = React.useState(false);
    // const [error, setError] = React.useState();

    // const loadSettings = async (cid: CID) => {
    //     try {
    //         setIsLoadingUserSettings(true);
    //         const p = await loadUserSettings(cid);
    //         setUserSettings(p);
    //     } catch (error) {
    //         setIsLoadingUserSettings(false);
    //         setError(error.toString());
    //         return;
    //     }
    //     setIsLoadingUserSettings(false);
    //     localStorage.setItem("userSettingsCID", cid)
    // };
    //
    // React.useEffect(() => {
    //     loadSettings(initialUserSettingsCid);
    // }, [initialUserSettingsCid]);

    const theme = createMuiTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box component={Container} mt={16}>
                <Typography variant={'h5'} gutterBottom={true} style={{ hyphens: 'auto', wordBreak: 'break-word' }}>
                    Hello, {username}!
                </Typography>
                <Typography>
                    Welcome to your IPFS Photo Gallery!
                </Typography>
                {/*<PhotoUpload />*/}
                <PhotoGalleryGrid />
                {/*<UserSettingsForm*/}
                {/*    cid={cid}*/}
                {/*    setCID={setCID}*/}
                {/*    error={error}*/}
                {/*    userSettings={userSettings}*/}
                {/*    loadSettings={loadSettings}*/}
                {/*    isLoadingUserSettings={isLoadingUserSettings}*/}
                {/*/>*/}
            </Box>
        </ThemeProvider>
    );
};

export default AuthenticatedLayout;
