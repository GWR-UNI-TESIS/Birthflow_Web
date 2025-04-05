import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    build: {
      outDir: 'build'
    },
    server: {
      port: 3000, 
    },
  });
}
