import AppRoutes from './routes/routes';
import { AuthProvider } from './contexts/auth-context';

const App = () => (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
);

export default App;