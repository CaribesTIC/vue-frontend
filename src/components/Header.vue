<template>
  <header class="p-5 text-white bg-gray-400">
    <nav class="container flex items-center justify-between mx-auto">
      <div class="flex items-left">
        <button
          @click="isOpen = true"
          class="text-gray-100 focus:outline-none lg:hidden"
        >
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div v-if="authUser" class="flex items-center space-x-5">
          <router-link to="/dashboard">
            <HomeIcon class="w-6 h-6 text-white" />
            <span class="sr-only">Dashboard</span>
          </router-link>
          <router-link to="/users" v-if="isAdmin">Users</router-link>
        </div>
        <router-link to="/" v-else>
          <HomeIcon class="w-6 h-6 text-white" />
        </router-link>
      </div>

      <div class="inline-flex items-center space-x-5" v-if="authUser">
        <router-link to="/user">{{ authUser.name }}</router-link>
        <Logout />
      </div>
      <router-link
        v-else
        to="/login"
        class="inline-flex items-center space-x-2"
      >
        <span>Login</span>
        <LoginIcon class="w-6 h-6 text-white" />
      </router-link>
    </nav>
  </header>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
//import { mapGetters } from "vuex";
import { useStore, mapGetters } from "vuex";


import { useSidebar } from "../hooks/useSidebar.js";
import Logout from "@/components/Logout";
import HomeIcon from "@/components/icons/HomeIcon";
import LoginIcon from "@/components/icons/LoginIcon";

export default defineComponent({
  name: "Header",  
  components: {
    Logout,
    HomeIcon,
    LoginIcon,
  },
  setup(_, { emit }) {
    const { isOpen } = useSidebar();
    const dropdownOpen = ref(false);
    const store = useStore();
    const authUser = computed(() => store.getters['auth/authUser']);
    const isAdmin = computed(() => store.getters['auth/isAdmin']);
    return {
      isOpen,
      dropdownOpen,
      authUser,
      isAdmin
    };
  }

});
</script>
