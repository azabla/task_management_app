<script setup>
import { useTaskStore } from "@/stores/tasks";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

const { errors } = storeToRefs(useTaskStore());
const { createTask } = useTaskStore();

const formData = reactive({
  title: "",
  body: "",
  status: "pending",
  due_date: ""
});


</script>

<template>
  <main>
    <h1 class="title">Create a new Task</h1>

    <form
      @submit.prevent="createTask(formData)"
      class="w-1/2 mx-auto space-y-6"
    >
      <div>
        <input type="text" placeholder="Task Title" v-model="formData.title" />
        <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
      </div>

      <div>
        <textarea
          rows="6"
          placeholder="Task Content"
          v-model="formData.body"
        ></textarea>
        <p v-if="errors.body" class="error">{{ errors.body[0] }}</p>
      </div>
      <div>
        <select
          v-model="formData.status"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Status</option>
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
        <!-- <p v-if="errors.due_date" class="text-red-500 text-sm">{{ errors.due_date[0] }}</p> -->
      </div>

      <button class="primary-btn">Create</button>
    </form>
  </main>
</template>
