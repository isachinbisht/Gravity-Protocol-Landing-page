import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

import express from 'express';
import fs from 'fs';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'waitlist-api',
        configureServer(server) {
          const app = express();
          app.use(express.json());
          
          app.post('/api/waitlist', (req, res) => {
            try {
              const data = req.body;
              data.timestamp = new Date().toISOString();
              
              let waitlist = [];
              if (fs.existsSync('waitlist.json')) {
                waitlist = JSON.parse(fs.readFileSync('waitlist.json', 'utf-8'));
              }
              waitlist.push(data);
              fs.writeFileSync('waitlist.json', JSON.stringify(waitlist, null, 2));
              
              res.json({ success: true });
            } catch (error) {
              console.error(error);
              res.status(500).json({ success: false, error: 'Failed to save to waitlist' });
            }
          });

          server.middlewares.use(app);
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
