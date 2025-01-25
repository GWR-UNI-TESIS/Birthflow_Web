import AppRoutes from './routes/routes';
import { App } from 'antd';
import { AuthProvider } from './contexts/auth-context';


const MyApp = () => (
    <App>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </App>
);

export default MyApp;