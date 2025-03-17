import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default {
    base: '/cueter/',
    plugins: [vue(),
        tailwindcss()
    ],
}