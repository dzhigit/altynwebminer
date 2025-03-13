<template>
  <div>
    <h1>Общая статистика: {{ total }}</h1>
    <button @click="sendData">Отправить данные</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const total = ref(0);
const { $pusher } = useNuxtApp(); // Получаем $pusher из useNuxtApp()

// Подключение к Pusher
onMounted(() => {
  const channel = $pusher.subscribe('stats-channel'); // Подписываемся на канал

  // Слушаем событие "update"
  channel.bind('update', (data) => {
    total.value = data.total;
  });
});

// Отправка данных на сервер
const sendData = async () => {
  const value = Math.floor(Math.random() * 10) + 1; // Пример данных от клиента
  await $fetch('/api/update-stats', {
    method: 'POST',
    body: { value },
  });
};
</script>