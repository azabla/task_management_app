import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useTaskStore = defineStore("taskStore", {
  state: () => {
    return {
      errors: {},
    };
  },
  actions: {
    /******************* Get all tasks *******************/
    async getAllTasks() {
      const res = await fetch("/api/tasks", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      // console.log(data);
      return data;
    },
    /******************* Get a tasks *******************/
    async getTask(id) {
      const res = await fetch(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      return data.task;
    },
    /******************* Create a task *******************/
    async createTask(formData) {
      const res = await fetch("/api/tasks", {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log(res);
      // console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.router.push({ name: "dashboard" });
        this.errors = {};
      }
    },

    /******************* Delete a task *******************/
    async deleteTask(id) {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        this.router.push({ name: "dashboard" });
      }
      // console.log(data);
    },
    async updateTask(task, formData) {
      try {
        const res = await fetch(`/api/tasks/${task.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });
    
        const data = await res.json();
        if (res.ok) {
          // Success handling
          this.router.push({ name: "dashboard" }); // Clear previous errors
          this.errors = {}; 
        } else {
          // Handle errors
          // console.log("Errors:", data.errors);
          this.errors = data.errors || {};
        }
      } catch (error) {
        console.error("Update task error:", error);
        // Optional: Set global error message
      }
    }
    
  },
});
