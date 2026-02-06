import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
    plugins: [reactRouter(), tsconfigPaths()],
    resolve: {
        alias: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            {
                find: '@img',
                replacement: path.resolve(__dirname, 'src/assets/img'),
            },
            {
                find: '@icons',
                replacement: path.resolve(__dirname, 'src/assets/icons'),
            },
            {
                find: '@config',
                replacement: path.resolve(__dirname, 'src/config'),
            },
            {
                find: '@var',
                replacement: path.resolve(__dirname, 'src/styles/variables'),
            },
            {
                find: '@mixins',
                replacement: path.resolve(__dirname, 'src/styles/mixins'),
            },
        ],
    },
    css: {
        devSourcemap: true,
        modules: {
            localsConvention: 'camelCase',
        },
    },
});
