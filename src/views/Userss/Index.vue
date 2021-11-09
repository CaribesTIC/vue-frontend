<script>
  import store from "@/store/index";
  export default {
    name: "Users",
    beforeRouteEnter(to, from, next) {
      const currentPage = parseInt(to.query.page) || 1;
      store.dispatch("user/getUsers", currentPage).then(() => {
        to.params.page = currentPage;
        next();
      });
    }
  };
</script>

<script setup>
  import { computed, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import MailIcon from "@/components/icons/MailIcon";
  import FlashMessage from "@/components/FlashMessage";
  import AvatarIcon from "@/components/icons/AvatarIcon";
  import BasePagination from "@/components/BasePagination";

  const store = useStore();
  const loading = computed(() => store.state.user.loading);
  const error = computed(() => store.state.user.error );
  const users = computed(() => store.state.user.users );
  const meta = computed(() => store.state.user.meta );
  const links = computed(() => store.state.user.links );
</script>

<template>
  <div class="p-5 xl:px-0">
    <transition name="fade" mode="out-in">
      <FlashMessage
        message="loading..."
        v-if="loading && !users.length"
        key="loading"
      />
      <ul v-else class="mt-5 bg-white">
        <li
          v-for="user in users"
          :key="user.id"
          class="flex items-center justify-between py-2 border-b"
        >
          <div class="inline-flex items-center space-x-2">
            <img
              v-if="user.avatar"
              :src="user.avatar"
              class="w-10 h-10 rounded-full"
              alt=""
            />
            <AvatarIcon class="w-10 h-10 text-gray-400 rounded-full" v-else />
            <span class="text-gray-600">{{ user.name }}</span>
          </div>
          <a
            :href="`mailto:${user.email}`"
            :title="user.emailVerified ? 'Verified' : 'Not Verified'"
            class="inline-flex items-center space-x-2"
          >
            <span class="hidden sm:inline">{{ user.email }}</span>
            <MailIcon
              class="w-8 h-8"
              :class="user.emailVerified ? 'text-green-400' : 'text-gray-300'"
            />
          </a>
        </li>
      </ul>
    </transition>
    <transition name="fade">
      <FlashMessage :error="error" v-if="error" key="error" />
    </transition>
    <transition name="fade">
      <BasePagination
        class="bg-white"
        path="users"
        :meta="meta"
        :links="links"
        action="user/paginateUsers"
        v-if="meta && meta.last_page > 1"
      />
    </transition>
  </div>
</template>


