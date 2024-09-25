<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <header>
    <nav>
      <div v-if="authStore.user">
        <RouterLink :to="{ name: 'dashboard' }" class="nav-link">Home</RouterLink>
      </div>
      <div v-else>
        <!-- <RouterLink :to="{ name: 'homeu' }" class="nav-link"></RouterLink> -->
        <RouterLink  :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
      </div>

      <div v-if="authStore.user" class="flex items-center space-x-6 ">
        <p class="text-sm">
         <span class="text-green-700">well come  </span> 
         <span class="text-orange-500 text-md">{{ authStore.user.name }}</span>
        </p>
        <RouterLink :to="{ name: 'create' }" class="nav-link">
          New Tasks
        </RouterLink>
        <form @submit.prevent="authStore.logout">
          <button class="nav-link">Logout</button>
        </form>
      </div>

      <div v-else class="space-x-6">
        <RouterLink :to="{ name: 'register' }" class="nav-link">
          Register
        </RouterLink>
        <RouterLink :to="{ name: 'login' }" class="nav-link">
          Login
        </RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>


