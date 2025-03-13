import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        import("@tabler/core/dist/js/tabler.min.js");
    }
});
