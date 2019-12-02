import * as React from 'react';
import {CID} from '../../ipfs/getUserSettings';
import {Box, Button, createStyles, TextField, WithStyles, withStyles} from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
    cid: CID,
    loadSettings: (cid: CID) => void,
    setCID: (cid: CID) => void,
    userSettings: object,
    error?: string,
    isLoadingUserSettings: boolean,
}

const UserSettingsForm: React.FC<Props> = (props) => {

    const { cid, setCID, loadSettings, error, isLoadingUserSettings, classes } = props;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loadSettings(cid);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box display={'flex'} alignItems={'flex-end'} marginTop={4} marginBottom={4}>
                <TextField
                    id={'preferencesCID'}
                    label={'User Settings CID'}
                    variant="outlined"
                    value={cid}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCID(e.currentTarget.value)}
                    error={error !== undefined}
                />
                <Button
                    color={'primary'}
                    variant={'contained'}
                    type={'submit'}
                    className={classes.button}
                    disabled={isLoadingUserSettings}
                >
                    {isLoadingUserSettings ? 'Loading User Settings' : 'Get User Settings'}
                </Button>
            </Box>
        </form>
    )
};

const styles = () => createStyles({
    button: {
        marginLeft: '1rem'
    }
});

export default withStyles(styles)(UserSettingsForm);
