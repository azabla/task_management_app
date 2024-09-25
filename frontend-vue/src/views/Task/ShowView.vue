<script setup>
import { useAuthStore } from "@/stores/auth"; // Import the auth store
import { useTaskStore } from "@/stores/tasks"; // Import the task store
import { onMounted, ref } from "vue"; // Import Vue functionalities
import { RouterLink, useRoute } from "vue-router"; // Import Vue Router functionalities

const route = useRoute(); // Get the current route
const authStore = useAuthStore(); // Set up the auth store
const taskStore = useTaskStore(); // Set up the task store
const task = ref(null); // Reactive variable for the task
const loading = ref(true);
// Fetch the task details on component mount
onMounted(async () => {
  task.value = await taskStore.getTask(route.params.id); // Fetch task by ID
  loading.value = false;
});

</script>

<template>
  <main class="min-h-screen bg-gray-100">
    <div
      class="flex items-center justify-center max-w-4xl w-full p-6 shadow-sm rounded-lg"
    >
      <!-- Centered Container -->

      <div v-if="task">
        <!-- Check if task is loaded -->
        <div class="pl-4 mt-12">
          <h2 class="font-bold text-3xl text-gray-800">{{ task.title }}</h2>
          <p class="text-gray-700 mb-4">{{ task.body }}</p>

          <!-- Display status and due date -->
          <div class="mt-4">
            <p class="font-semibold">
              Status:
              <span
                :class="{
                  'text-red-500': task.status === 'completed',
                  'text-yellow-500': task.status === 'in_progress',
                  'text-green-500': task.status === 'pending',
                }"
                >{{ task.status }}</span
              >
            </p>
            <p class="font-semibold">
              Due Date: <span class="text-gray-700">{{ task.due_date }}</span>
            </p>
          </div>

          <div v-if="authStore.user" class="flex items-center gap-6 mt-6">
            <form @submit.prevent="taskStore.deleteTask(task.id)">
              <!-- Directly use deleteTask from taskStore -->
              <button
                class="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </form>
            <RouterLink
              :to="{ name: 'update', params: { id: task.id } }"
              class="bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-600 transition"
              >Update</RouterLink
            >
          </div>
        </div>
      </div>
      <div v-if="loading" class="text-center p-4">
        <h2 class="text-center text-xl text-gray-800 mt-12">Loading tasks...</h2>
      </div>
      
    </div>
  </main>
</template>
