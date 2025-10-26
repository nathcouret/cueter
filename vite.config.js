import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default {
    base: process.env.BASE_URL || '/cueter/',
    plugins: [
        vue(),
        tailwindcss()
    ],
}