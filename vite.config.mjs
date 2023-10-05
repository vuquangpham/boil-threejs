import glsl from 'vite-plugin-glsl';
import {defineConfig} from 'vite';

import {resolve} from 'path';

export default defineConfig({
    publicDir: '../assets',
    root: 'public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: false,

        /* https://stackoverflow.com/a/71190586 */
        rollupOptions: {
            output: {
                assetFileNames: `[hash][extname]`,
                chunkFileNames: `[hash].js`,
                entryFileNames: `[hash].js`,
            },
        }
    },

    // resolve alias
    resolve: {
        alias: [
            {find: '@', replacement: resolve(__dirname, 'src')},
        ],
    },

    // plugins
    plugins: [glsl()],

    // dev server
    server: {
        port: 8080
    }
});
