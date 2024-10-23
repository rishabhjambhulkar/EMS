import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',  // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};



// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://ems-cbf9rakmc-rishabh-jambhulkars-projects.vercel.app',
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
//   plugins: [react()],
// });
