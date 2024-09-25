<script setup>
import { useTaskStore } from "@/stores/tasks"; // Import the task store
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../../stores/auth";

// Set up the store
const taskStore = useTaskStore();
const authStore = useAuthStore();
const tasks = ref([]);
const filteredTasks = ref([]); // Store for filtered tasks
const selectedStatus = ref(""); // Reactive variable for selected status
const loading = ref(true);
// Fetch tasks from the store on component mount
onMounted(async () => {
  tasks.value = await taskStore.getAllTasks();
  filteredTasks.value = tasks.value; // Initialize filtered tasks
  loading.value = false; // Set loading to false after data is loaded
});

// Function to delete a task
// const deleteTask = async (id) => {
//   await taskStore.deleteTask(id); // Implement task deletion in the store
//   tasks.value = tasks.value.filter(task => task.id !== id); // Remove from local state
//   filterTasks(); // Update filtered tasks after deletion
// };

// Function to get the status class
const getStatusClass = (status) => {
  switch (status) {
    case "completed":
      return "text-green-500";
    case "pending":
      return "text-yellow-500";
    case "in-progress":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

// Function to filter tasks by selected status
const filterTasks = () => {
  if (!selectedStatus.value) {
    filteredTasks.value = tasks.value; // No filter applied
  } else {
    filteredTasks.value = tasks.value.filter(
      (task) => task.status === selectedStatus.value
    );
  }
};

// Function to delete a task
const deleteTask = async (id) => {
  try {
    // Call your store method or API to delete the task
    taskStore.deleteTask(id); // Ensure this deletes the task on the backend
    tasks.value = tasks.value.filter((task) => task.id !== id);
    filterTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
</script>

<template>
  <main class="max-w-7xl mx-auto p-4">
    <!-- Add Task Button -->
    <div class="mb-4 flex items-center">
      <RouterLink
        :to="{ name: 'create' }"
        class="bg-blue-500 text-white mr-4 px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Task
      </RouterLink>

      <!-- Status Filter Dropdown -->
      <select
        v-model="selectedStatus"
        @change="filterTasks"
        class="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <!-- Loading spinner or message -->
    <div v-if="loading" class="text-center p-4">
      <h2 class="text-center text-xl text-gray-800 mt-12">Loading tasks...</h2>
    </div>

    <!-- Task Table -->
    <table v-else class="min-w-full bg-white shadow-md rounded-lg">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2 text-left">Title</th>
          <th class="px-4 py-2 text-left">Description</th>
          <th class="px-4 py-2 text-left">Status</th>
          <th class="px-4 py-2 text-left">Due Date</th>
          <th class="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredTasks.length === 0">
          <td colspan="5" class="text-center p-4">No tasks available</td>
        </tr>
        <tr v-for="task in filteredTasks" :key="task.id" class="border-b">
          <td class="px-4 py-2">{{ task.title }}</td>
          <td class="px-4 py-2">{{ task.body }}</td>
          <td class="px-4 py-2" :class="getStatusClass(task.status)">
            {{ task.status }}
          </td>
          <td class="px-4 py-2">{{ task.due_date }}</td>
          <td class="px-4 py-2 flex gap-2">
            <RouterLink
              :to="{ name: 'show', params: { id: task.id } }"
              class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >Detail</RouterLink
            >

            <div v-if="authStore.user">
              <button
                @click="deleteTask(task.id)"
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
