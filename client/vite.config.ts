import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  },
  plugins: [reactRefresh()],
});
