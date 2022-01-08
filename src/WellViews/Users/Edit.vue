<script setup>
  import { onMounted, computed } from 'vue'
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router'
  import BaseBtn from "@/components/BaseBtn";
  import FlashMessage from "@/components/FlashMessage";
  import FlashMessages from "@/components/FlashMessages";
  import PageHeader from "@/components/PageHeader";
  import useUser from "./useUser";

  const router = useRouter();
  const store = useStore();
  const props = defineProps({ id: String })

  const {
    errors,    
    form,
    helperTables,
    loading,
    sending,
    roles,
  } = useUser();

  onMounted(async () => {
    if (props.id != store.state.user.user.id) 
      await store.dispatch("user/getUser", props.id);
    await helperTables();
  });

  const userUpdate = async (userId, form) => {
    await store.dispatch("user/updateUser", { userId, form });
    router.push({ path: '/users' });
  };

</script>

<template>
  <div>
    <FlashMessages /> 
    <page-header>Usuarios / Editar</page-header>
    <transition name="fade" mode="out-in">
      <FlashMessage
        message="loading..."
        v-if="loading && !form.length"
        key="loading"
      />
      <div v-else class="panel mt-6 p-4">      
        <div  class="flex space-x-2">
          <button class="btn btn-primary mb-4" @click="router.push({ path: '/users' })">Ver todos</button>
        </div>
        <div class="panel mt-6">
          <form @submit.prevent="userUpdate(props.id, form)" class="p-4">
            <div class="grid lg:grid-cols-2 gap-4">
              <!-- name -->
              <label class="block">
                <span class="text-gray-700">Nombre</span>
                <input v-model="form.name" type="text" class="" />
                <div v-if="errors.errors.name" class="form-error">
                  {{ errors.errors.name[0] }}
                </div>
              </label>
              <!-- email -->
              <label class="block">
                <span class="text-gray-700">Correo</span>
                <input v-model="form.email" type="email" class="" />
                <div v-if="errors.errors.email" class="form-error">
                  {{ errors.errors.email[0] }}
                </div>
              </label>
              <!-- password -->
              <label class="block">
                <span class="text-gray-700">Password</span>
                <input v-model="form.password" type="password" class="" />
                <div v-if="errors.errors.password" class="form-error">
                  {{ errors.errors.password[0] }}
                </div>
              </label>
              <!-- role -->
              <label class="block">
                <span class="text-gray-700">Rol</span>
                <select v-model="form.role_id" class="p-2">
                  <option v-for="role in roles" :value="role.id" :key="role">
                    {{ role.name }}
                  </option>
                </select>
                <div v-if="errors.errors.role_id" class="form-error">
                  {{ errors.errors.role_id[0] }}
                </div>
              </label>
            </div>

            <div class="mt-4 px-2 border-gray-100 flex justify-end space-x-2">
              <BaseBtn
                type="submit"
                :text="sending ? 'Guardando...' : 'Guardar'"
                :isDisabled='sending'
              />
            </div>

          </form>
        </div>
      </div>
    </transition>
  </div>
</template>
