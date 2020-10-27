import * as React from 'react';
import LoginForm from './LoginForm';
import AuthenticatedLayout from './AuthenticatedLayout';
import useAuth from './useAuth';
import { CircularProgress } from '@material-ui/core';
import { Scenario } from 'webnative';

const AuthLayout: React.FC = () => {

    const {authScenario} = useAuth();

    React.useEffect(() => console.log(authScenario), [authScenario]);

    if (authScenario !== undefined) {
        if (authScenario === Scenario.AuthSucceeded || authScenario === Scenario.Continuation) {
            return <AuthenticatedLayout/>
        } else {
            return <LoginForm/>;
        }
    }
    return <CircularProgress/>;
};

export default AuthLayout;
