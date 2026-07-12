import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

import express from 'express';
import fs from 'fs';
import 'dotenv/config';

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
          
          app.post('/api/waitlist', async (req, res) => {
            try {
              const data = req.body;
              data.timestamp = new Date().toISOString();
              
              // 1. Save locally to waitlist.json (fallback/record)
              let waitlist = [];
              if (fs.existsSync('waitlist.json')) {
                waitlist = JSON.parse(fs.readFileSync('waitlist.json', 'utf-8'));
              }
              waitlist.push(data);
              fs.writeFileSync('waitlist.json', JSON.stringify(waitlist, null, 2));
              
              // 2. Send to Google Sheets via Apps Script Web App
              // Requires GOOGLE_SCRIPT_URL in .env file
              const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
              if (scriptUrl) {
                try {
                  const googleRes = await fetch(scriptUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });
                  if (!googleRes.ok) {
                    console.error('Failed to forward to Google Sheets:', googleRes.statusText);
                  }
                } catch (fetchErr) {
                  console.error('Error contacting Google Apps Script:', fetchErr);
                }
              }

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
