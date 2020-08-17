import * as React from 'react';
import LoginForm from "./LoginForm";
import AuthenticatedLayout from "./AuthenticatedLayout";
import useAuth from "./useAuth";

const AuthLayout: React.FC = () => {

    const { auth } = useAuth();

    return (auth.authSucceeded || auth.continuum) ? <AuthenticatedLayout /> : <LoginForm />;
};

export default AuthLayout;
