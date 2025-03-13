<script setup>
const { $supabase } = useNuxtApp();
const email = ref("");
const password = ref("");
const user = ref(null);
const errorMessage = ref("");

const signUp = async () => {
  const { user, error } = await $supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorMessage.value = error.message;
  } else {
    console.log("Регистрация успешна:", user);
  }
};

const signIn = async () => {
  const { user, error } = await $supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorMessage.value = error.message;
  } else {
    console.log("Вход успешен:", user);
  }
};

const signOut = async () => {
  await $supabase.auth.signOut();
  user.value = null;
};
</script>

<template>
  <div class="p-4">
    <input v-model="email" type="email" placeholder="Email" class="border p-2 m-2" />
    <input v-model="password" type="password" placeholder="Пароль" class="border p-2 m-2" />
    
    <button @click="signUp" class="bg-green-500 text-white p-2 m-2">Регистрация</button>
    <button @click="signIn" class="bg-blue-500 text-white p-2 m-2">Войти</button>
    <button @click="signOut" class="bg-red-500 text-white p-2 m-2">Выйти</button>
    
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </div>
</template>
