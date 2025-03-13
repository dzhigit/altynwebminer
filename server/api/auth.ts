import { H3Event, setCookie, getQuery, sendRedirect } from 'h3';
import crypto from 'crypto';
import { supabase } from '~/utils/supabase'; // Импортируем Supabase

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);

  // Проверяем подпись Telegram
  //const secret = crypto.createHash('sha256').update('6999421299:AAHLOIqtrQm-asgewmxwgykytVEQk-KF3do').digest();

  // Проверяем подпись Telegram
  const secret = crypto
    .createHash('sha256')
    .update(process.env.TELEGRAM_BOT_TOKEN!) // Используем токен из .env
    .digest();


  const checkString = Object.keys(query)
    .filter((key) => key !== 'hash')
    .sort()
    .map((key) => `${key}=${query[key]}`)
    .join('\n');

  const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');

  if (hmac !== query.hash) {
    return { error: 'Invalid data' };
  }

  // Получаем пользователя из Supabase
  const { data: existingUser, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', query.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    return { error: 'Database error' };
  }

  // Если пользователя нет — создаём
  if (!existingUser) {
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: query.id,
        first_name: query.first_name,
        username: query.username,
        photo_url: query.photo_url,
        auth_date: query.auth_date,
      },
    ]);

    if (insertError) {
      return { error: 'Failed to create user' };
    }
  }

  // Сохраняем данные в куки
  setCookie(event, 'tgUser', JSON.stringify(query), { path: '/', httpOnly: true });

  // ✅ Редирект на дашборд
  return sendRedirect(event, '/dashboard');
});