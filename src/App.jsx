import AppRoutes from "./routes/routes";
import { App } from "antd";
import { AuthProvider } from "./contexts/auth-context";
import { CatalogProvider } from "./contexts/catalog-context";
import LayoutGeneral from "./components/LayoutGeneral";
const MyApp = () => (
  <App>
    <CatalogProvider>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
    </CatalogProvider>
  </App>
);

export default MyApp;
