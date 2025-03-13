<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

const router = useRouter()

const { $supabase } = useNuxtApp();
//const supabase = createClient(supabaseUrl, supabaseAnonKey)

onMounted(() => {
  window.onTelegramAuth = async (userData) => {
    console.log('Получены данные пользователя:', userData)

    // ✅ Сохраняем данные в sessionStorage
    sessionStorage.setItem('tgUser', JSON.stringify(userData))

    // ✅ Проверяем, есть ли пользователь в Supabase
    const { data: existingUser, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userData.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Ошибка запроса в Supabase:', error.message)
      return
    }

    if (!existingUser) {
      // ✅ Добавляем нового пользователя
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: userData.id,
          first_name: userData.first_name,
          username: userData.username,
          photo_url: userData.photo_url,
          auth_date: userData.auth_date
        }
      ])

      if (insertError) {
        console.error('Ошибка добавления пользователя:', insertError.message)
        return
      }
    }

    // ✅ Редирект в дашборд
    router.push('/dashboard')
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-2xl font-bold">Вход через Telegram</h1>
    <div v-html="`<script async src='https://telegram.org/js/telegram-widget.js?21' data-telegram-login='tokenrebate_bot' data-size='large' data-auth-url='/api/auth' data-request-access='write'></script>`"></div>
  </div>
</template>
