import AppRoutes from "./routes/routes";
import { App, ConfigProvider } from "antd";
import { AuthProvider } from "./contexts/auth-context";
import { CatalogProvider } from "./contexts/catalog-context";
import { SWRConfig } from "swr";
import es_ES from 'antd/locale/es_ES';

const MyApp = () => (
  <SWRConfig value={{ suspense: false, revalidateOnFocus: false }}>
    <ConfigProvider locale={es_ES}>
      <App>
        <CatalogProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </CatalogProvider>
      </App>
    </ConfigProvider>
  </SWRConfig>
);

export default MyApp;
