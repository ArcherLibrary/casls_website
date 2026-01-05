import { defineConfig } from 'vite'

export default defineConfig({
    base: './', // Use relative paths for easier deployment on GitHub Pages
    build: {
        outDir: 'dist'
    }
})
