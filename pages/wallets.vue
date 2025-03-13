<script setup>
import { ref, onMounted } from 'vue'

const wallet = ref('')
const wallets = ref([])
const userId = ref('1417068092') // Здесь должен быть Telegram ID пользователя

const botToken = '6999421299:AAHLOIqtrQm-asgewmxwgykytVEQk-KF3do'
const fileUrl = ref('') // Тут будет ссылка на загруженный JSON-файл

// Функция добавления кошелька
const addWallet = async () => {
  if (!wallet.value.trim()) return

  wallets.value.push(wallet.value)
  wallet.value = ''

  // Отправляем JSON-файл в Telegram
  await sendFileToTelegram()
}

// Функция создания JSON-файла и загрузки в Telegram
const sendFileToTelegram = async () => {
  if (!userId.value) return alert('Авторизуйтесь через Telegram!')

  // Создаём JSON-данные
  const jsonData = JSON.stringify({ userId: userId.value, wallets: wallets.value }, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const file = new File([blob], 'wallets.json', { type: 'application/json' })

  // Отправляем JSON-файл в Telegram
  const formData = new FormData()
  formData.append('chat_id', userId.value)
  formData.append('document', file)

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
    method: 'POST',
    body: formData
  })

  const result = await response.json()
  if (result.ok) {
    const fileId = result.result.document.file_id
    await getFileLink(fileId) // Получаем ссылку на файл
  } else {
    alert('Ошибка при загрузке файла в Telegram!')
  }
}

// Функция получения ссылки на файл
const getFileLink = async (fileId) => {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`)
  const result = await response.json()

  if (result.ok) {
    const filePath = result.result.file_path
    fileUrl.value = `https://api.telegram.org/file/bot${botToken}/${filePath}`
    alert(`Файл загружен! Ссылка: ${fileUrl.value}`)
  } else {
    alert('Ошибка при получении ссылки на файл!')
  }
}

onMounted(() => {
  console.log('Страница загружена')
})
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-xl font-bold mb-4">Добавьте кошелек</h2>

    <input 
      v-model="wallet" 
      placeholder="Введите номер кошелька" 
      class="w-full p-2 border rounded mb-2"
    />

    <button 
      @click="addWallet" 
      class="w-full bg-blue-500 text-white p-2 rounded"
    >
      Добавить
    </button>

    <ul v-if="wallets.length" class="mt-4">
      <li v-for="(w, index) in wallets" :key="index" class="p-2 border-b">{{ w }}</li>
    </ul>

    <div v-if="fileUrl" class="mt-4">
      <p>Файл загружен!</p>
      <a :href="fileUrl" target="_blank" class="text-blue-500">{{ file_id }}</a>
    </div>
  </div>
</template>
