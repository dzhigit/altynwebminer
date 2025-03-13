import Pusher from 'pusher-js';

export default defineNuxtPlugin((nuxtApp) => {
    // Получаем ключ и кластер из переменных окружения
    const appKey = process.env.NUXT_PUBLIC_PUSHER_APP_KEY;
    const cluster = process.env.NUXT_PUBLIC_PUSHER_APP_CLUSTER;

    // Проверяем, что ключ и кластер загружены
    if (!appKey || !cluster) {
        console.error('Pusher app key or cluster is missing. Check your .env file.');
        return;
    }

    // Инициализируем Pusher
    const pusher = new Pusher(appKey, {
        cluster,
        encrypted: true,
    });

    console.log('Pusher initialized successfully.');

    return {
        provide: {
            pusher,
        },
    };
});