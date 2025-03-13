<template>
  <body data-bs-theme="dark">
    <div class="page">
      <!-- Навигация -->
      <header class="navbar navbar-expand-md d-print-none">
        <div class="container-xl">
          <a href="/" class="navbar-brand">AltynWebMiner</a>
        </div>
      </header>

      <header class="navbar-expand-md">
      <MenuHead/>
      </header>
      
      <div class="page-wrapper">

      <Breadcump/>
        
        <div class="page-body">
        <div class="container-xl">
          
          <WidgetCrypto />
          
          <slot />

        </div>

        </div>
      </div>

    <Footer/>

    </div>
  </body>
</template>

<script setup>
useHead({ title: "Nuxt 3 + Tabler" });

import WidgetCrypto from "~/components/widgets/WidgetCrypto.vue";


</script>
