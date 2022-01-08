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
  import FlashMessages from "@/components/FlashMessages";
  import AvatarIcon from "@/components/icons/AvatarIcon";
  import BasePagination from "@/components/BasePagination";
  import PageHeader from "@/components/PageHeader";
  import { useRouter, useRoute } from 'vue-router'

  const store = useStore();
  const router = useRouter()
  const isAdmin = computed(() => store.getters['auth/isAdmin'] );
  const loading = computed(() => store.state.user.loading);
  const error = computed(() => store.state.user.error );
  const users = computed(() => store.state.user.users );
  const meta = computed(() => store.state.user.meta );
  const links = computed(() => store.state.user.links );
</script>

<template>
  <div class="p-0 xl:px-0">
   <FlashMessages />
   <PageHeader>Usuarios</PageHeader>
    <transition name="fade" mode="out-in">
      <FlashMessage
        message="loading..."
        v-if="loading && !users.length"
        key="loading"
      />
      <div v-else class="table-data__wrapper">

    <div class="mb-3" v-if="isAdmin">
      <button class="btn btn-primary" @click="router.push({ path: '/users/create' })">Crear</button>
    </div>
    
        <table class="table-data">
          <thead>
            <tr class="">
              <th class="">
                <a href="#" @click.prevent="setSort('name')">Nombre</a>
              </th>
              <th class="">
                <a href="#" @click.prevent="setSort('email')">Correo</a>
              </th>
              <th class="">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="">
              <td>
                <div class="inline-flex items-center space-x-2">
                  <img
                    v-if="user.avatar"
                    :src="user.avatar"
                    class="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <AvatarIcon class="w-10 h-10 text-gray-400 rounded-full" v-else />
                  <button
                    @click="router.push({ path: '/users/show/'+user.id })"
                    class="a-link"
                  >
                    {{ user.name }}
                  </button>
                </div>
              </td>
              <td class="">
                <a
                  :href="`mailto:${user.email}`"
                  :title="user.emailVerified ? 'Verified' : 'Not Verified'"
                  class="inline-flex items-center space-x-2"
                >
                  <MailIcon
                    class="w-8 h-8"
                    :class="user.emailVerified ? 'text-green-400' : 'text-gray-300'"
                  />
                  <span class="hidden sm:inline">{{ user.email }}</span>
                </a>
              </td>
              <td class="">
                <div class="flex items-center space-x-1">
                  <button class="btn btn-success btn-xs" @click="router.push({ path: '/users/show/'+user.id })">Mostrar</button>
                  <button class="btn btn-primary btn-xs" @click="router.push({ path: '/users/edit/'+user.id })">Editar</button>
                  <button @click="deleteRow(user.id)" class="btn btn-danger btn-xs" >Eliminar</button>
                </div>
              </td>
            </tr>
            <tr v-if="users.length === 0">
              <td class="" colspan="4">Usuarios no encontrados.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </transition>
    <!--transition name="fade">
      <FlashMessage :error="error" v-if="error" key="error" />
    </transition-->
    <transition name="fade">
      <BasePagination
        class="bg-white p-5"
        path="users"
        :meta="meta"
        :links="links"
        action="user/paginateUsers"
        v-if="meta && meta.last_page > 1"
      />
    </transition>
  </div>
</template>


