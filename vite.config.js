import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
    server: {
        host: true,
        hmr: { host: "localhost" },
    },
    plugins: [
        laravel({
            input: ["resources/js/index.jsx"],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@css": resolve(__dirname, "resources/css"),
            "@js": resolve(__dirname, "resources/js"),
            "@images": resolve(__dirname, "resources/images"),
        },
    },
});
