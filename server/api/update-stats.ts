import Pusher from 'pusher';

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.NUXT_PUBLIC_PUSHER_APP_KEY, // Используем публичный ключ
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.NUXT_PUBLIC_PUSHER_APP_CLUSTER, // Используем публичный кластер
    useTLS: true,
});

let total = 0;

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    total += body.value;

    // Отправляем обновление всем клиентам
    await pusher.trigger('stats-channel', 'update', { total });

    return { total };
});