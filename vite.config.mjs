import glsl from 'vite-plugin-glsl';
import {defineConfig} from 'vite';

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
    plugins: [glsl()],
    server: {
        port: 8080
    }
});
