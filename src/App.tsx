import * as React from 'react';
import AuthLayout from "./components/Auth/AuthLayout";
import {AuthProvider} from "./components/Auth/AuthContext";

const App: React.FC = () => (
    <AuthProvider>
        <AuthLayout />
    </AuthProvider>
);

export default App;
