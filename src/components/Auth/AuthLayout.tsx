import * as React from 'react';
import LoginForm from "./LoginForm";
import AuthenticatedLayout from "./AuthenticatedLayout";
import useAuth from "./useAuth";

const AuthLayout: React.FC = () => {
    const { verified } = useAuth();
    return verified ? <AuthenticatedLayout /> : <LoginForm />
};

export default AuthLayout;
