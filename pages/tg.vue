<template>
  <div>
    <div ref="telegramLogin"></div>
    <button v-if="userData" @click="saveToDatabase">Сохранить в БД</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, useNuxtApp } from '#imports';

const { $supabase } = useNuxtApp();
const userData = ref(null);
const message = ref('');
const telegramLogin = ref(null);

onMounted(() => {
  window.TelegramLoginWidget = (user) => {
    console.log('Telegram user data:', user); // Отладка
    userData.value = user;
  };

  if (telegramLogin.value) {
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.async = true;
    script.setAttribute('data-telegram-login', 'tokenrebate_bot'); // Замени на username бота
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-auth-url', 'https://just-python-deadly.ngrok-free.app/api/auth'); // Замени на свой URL
    script.setAttribute('data-request-access', 'write');
    script.onload = () => console.log('Telegram Widget Loaded');

    telegramLogin.value.appendChild(script);
  }
});

const saveToDatabase = async () => {
  if (!userData.value) {
    message.value = 'Ошибка: пользователь не авторизован!';
    return;
  }

  console.log('Сохраняем данные в Supabase:', userData.value); // Отладка

  const { id, first_name, last_name, username } = userData.value;

  const { error } = await $supabase.from('users').insert([
    {
      telegram_id: id,
      first_name,
      last_name,
      username
    }
  ]);

  if (error) {
    console.error('Ошибка при добавлении в БД:', error.message);
    message.value = 'Ошибка: ' + error.message;
  } else {
    message.value = 'Запись успешно добавлена!';
  }
};
</script>
