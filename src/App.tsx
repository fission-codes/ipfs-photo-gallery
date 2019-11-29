import * as React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import UserSettingsForm from "./components/UserSettingsForm";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {CID, DEFAULT_CID, loadUserSettings} from "./ipfs/getUserSettings";
import {Box, Container, Typography} from "@material-ui/core";
import './App.css';
import {PhotoUpload} from "./components/PhotoUpload";
import PhotoGalleryGrid from "./components/PhotoGalleryGrid";

const App: React.FC = () => {

    const initialUserSettingsCid = localStorage.getItem("userSettingsCID") || DEFAULT_CID;
    const [cid, setCID] = React.useState(initialUserSettingsCid);
    const [userSettings, setUserSettings] = React.useState();
    const [isLoadingUserSettings, setIsLoadingUserSettings] = React.useState(false);
    const [error, setError] = React.useState();

    const loadSettings = async (cid: CID) => {
        try {
            setIsLoadingUserSettings(true);
            const p = await loadUserSettings(cid);
            setUserSettings(p);
        } catch (error) {
            setIsLoadingUserSettings(false);
            setError(error.toString());
            return;
        }
        setIsLoadingUserSettings(false);
        localStorage.setItem("userSettingsCID", cid)
    };

    React.useEffect(() => {
        loadSettings(initialUserSettingsCid);
    }, [initialUserSettingsCid]);

    const theme = createMuiTheme(userSettings && {
        palette: {
            type: userSettings.theme,
            primary: {
                main: userSettings.primaryColor
            },
            secondary: {
                main: userSettings.secondaryColor
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box component={Container} mt={theme.spacing(1)}>
                <Typography variant={'h1'} gutterBottom={true} style={{ hyphens: 'auto' }}>
                    Hello{userSettings && ', ' + userSettings.username}!
                </Typography>
                <PhotoUpload />
                <PhotoGalleryGrid />
                <UserSettingsForm
                    cid={cid}
                    setCID={setCID}
                    error={error}
                    userSettings={userSettings}
                    loadSettings={loadSettings}
                    isLoadingUserSettings={isLoadingUserSettings}
                />
            </Box>
        </ThemeProvider>
    );
};

export default App;
