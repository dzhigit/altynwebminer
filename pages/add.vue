<script setup>
import { ref, useNuxtApp } from '#imports';

const { $supabase } = useNuxtApp();
const data = ref({ claim: null });
const message = ref('');

const addRecord = async () => {
  const { error } = await $supabase.from('miners').insert([data.value]);
  if (error) {
    message.value = 'Ошибка: ' + error.message;
  } else {
    message.value = 'Запись добавлена!';
  }
};
</script>

<template>
  <div>
    
    <input v-model.number="data.claim" type="number" placeholder="claim" />
    <button @click="addRecord">Добавить</button>
    <p>{{ message }}</p>
  </div>
</template>
