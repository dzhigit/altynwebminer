import { defineNuxtPlugin } from "#app";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default defineNuxtPlugin(async (nuxtApp) => {
    if (process.server) return; // Не запускаем на сервере

    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const shortFingerprint = result.visitorId.substring(0, 8); // Обрезаем до 8 символов

    nuxtApp.provide("fingerprint", shortFingerprint);
});
