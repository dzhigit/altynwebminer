<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useHead } from '#imports'

const router = useRouter()

onMounted(() => {
  window.onTelegramAuth = (userData) => {
    document.cookie = `tgUser=${JSON.stringify(userData)}; path=/`
    router.push('/dashboard')
  }
})

// Загружаем виджет только здесь
useHead({
  script: [
    {
      src: 'https://telegram.org/js/telegram-widget.js?21',
      async: true
    }
  ]
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold">Вход через Telegram</h1>
    <div v-html="`<script async src='https://telegram.org/js/telegram-widget.js?21' data-telegram-login='tokenrebate_bot' data-size='large' data-auth-url='/api/auth' data-request-access='write'></script>`"></div>
  </div>
</template>
