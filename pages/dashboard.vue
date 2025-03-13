<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const user = ref(null)

onMounted(async () => {
  const response = await fetch('/api/session')
  const data = await response.json()

  if (!data) {
    router.push('/login') // Если нет данных — кидаем на логин
  } else {
    user.value = data
  }
})
</script>

<template>
  <div>
    <h1 v-if="user">Привет, {{ user.first_name }}!</h1>
    <p v-else>Загрузка...</p>
  </div>
</template>
