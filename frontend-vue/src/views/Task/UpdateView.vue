<script setup>
import { useTaskStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";


const route = useRoute();
// const { user } = storeToRefs(useAuthStore());
const { errors } = storeToRefs(useTaskStore());
const {updateTask, getTask} = useTaskStore();

const task = ref(null);

// Reactive form data
const formData = reactive({
  title: "",
  body: "",
  status: "",      // New status field
  due_date: "",    // New due date field
});

// Fetch task on mount
onMounted( async() => {
  task.value = await getTask(route.params.id);
 
    // Populate form with existing task data
    if(task.value){
      formData.title = task.value.title;
      formData.body = task.value.body;
      formData.status = task.value.status;    // Populate status
      formData.due_date = task.value.due_date; // Populate due date
    }
  
});


</script>

<template>
  <main class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Update Your Task</h1>
    
    <form @submit.prevent="updateTask(task, formData)"
    class="space-y-6">
      <div>
        <input
          type="text"
          placeholder="Task Title"
          v-model="formData.title"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title[0] }}</p>
      </div>

      <div>
        <textarea
          rows="6"
          placeholder="Task Content"
          v-model="formData.body"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <p v-if="errors.body" class="text-red-500 text-sm">{{ errors.body[0] }}</p>
      </div>

      <div>
        <select
          v-model="formData.status"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value=""  selected>Select Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <p v-if="errors.status" class="text-red-500 text-sm">{{ errors.status[0] }}</p>
      </div>

      <div>
        <input
          type="date"
          v-model="formData.due_date"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p v-if="errors.due_date" class="text-red-500 text-sm">{{ errors.due_date[0] }}</p>
      </div>

      <button class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
        Update
      </button>
    </form>
  </main>
</template>

