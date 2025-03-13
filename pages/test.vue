<script setup>
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";


const { $supabase, $fingerprint } = useNuxtApp(); // Получаем Supabase и Fingerprint

const wallet = ref(""); // Введённый кошелёк
const fingerprint = ref($fingerprint); // Уникальный ID пользователя
const successMessage = ref(""); // Сообщение об успехе

const registerUser = async () => {
  if (!wallet.value) return alert("Введите кошелёк!");

  const { error } = await $supabase.from("users").insert([
    { finger: fingerprint.value, wallet: wallet.value }
  ]);

  if (error) {
    console.error("Ошибка:", error);
    alert("Ошибка при сохранении!");
  } else {
    successMessage.value = "Вы успешно зарегистрированы!";
    wallet.value = "";
  }
};

const { data } = await useFetch('https://ipapi.co/json/');
console.log('Страна:', data.value?.country_name);

</script>

<template>
  <div class="container">
    <h1>Регистрация</h1>
    <p>Ваш Fingerprint: <strong>{{ fingerprint }}</strong></p>

    <input v-model="wallet" placeholder="Введите ваш кошелёк" />
    <button @click="registerUser">Зарегистрироваться</button>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
button {
  padding: 10px;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
}
.success {
  color: green;
  font-weight: bold;
}
</style>
