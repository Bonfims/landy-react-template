import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        react(),
        createHtmlPlugin({
            inject: {
                data: {
                    title: 'Landy - React Template',
                    description: 'Landy is a free React landing page template designed for developers and startups.',
                    url: 'https://landy.website/',
                    theme_color: '#000000',
                },
            },
        }),
        VitePWA({
            manifest: {
                name: 'Landy - React Template',
                short_name: 'Landy',
                description: 'Landy is a free React landing page template designed for developers and startups.',
                theme_color: '#000000',
                start_url: ".",
                display: "standalone",
                background_color: "#ffffff",
                icons: [
                    {
                        "src": "img/icons/logo192.png",
                        "sizes": "64x64 32x32 24x24 16x16",
                        "type": "image/x-icon"
                    },
                    {
                        "src": "img/icons/logo192.png",
                        "type": "image/png",
                        "sizes": "192x192"
                    },
                    {
                        "src": "img/icons/logo512.png",
                        "type": "image/png",
                        "sizes": "512x512"
                    }
                ],
            },
        }),
    ]
});