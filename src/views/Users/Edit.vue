<script setup>
  import { onMounted, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import FlashMessage from "@/components/FlashMessage";
  import PageHeader from "@/components/PageHeader";
  import LoadingButton from "@/components/LoadingButton";
  import useUser from "./useUser";

  const router = useRouter()
  const props = defineProps({ id: String })
  const { form, loading, userGet, helperTables, roles, userUpdate } = useUser();

  onMounted(async () => {
    await userGet(props.id);
    await helperTables();
  });

</script>

<template>
  <div>
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
                <!--div v-if="errors.name" class="form-error">
                  {{ errors.name }}
                </div-->
              </label>
              <!-- email -->
              <label class="block">
                <span class="text-gray-700">Correo</span>
                <input v-model="form.email" type="email" class="" />
                <!--div v-if="errors.email" class="form-error">
                  {{ errors.email }}
                </div-->
              </label>
              <!-- password -->
              <label class="block">
                <span class="text-gray-700">Password</span>
                <input v-model="form.password" type="password" class="" />
                <!--div v-if="errors.password" class="form-error">
                  {{ errors.password }}
                </div-->
              </label>
              <!-- role -->
              <label class="block">
                <span class="text-gray-700">Rol</span>
                <select v-model="form.role_id" class="p-2">
                  <option v-for="role in roles" :value="role.id" :key="role">
                    {{ role.name }}
                  </option>
                </select>
              </label>
            </div>
            <div class="mt-4 px-2 border-gray-100 flex justify-end space-x-2">
              <loading-button
                :loading="loading"
                class="btn btn-primary ml-auto"
                type="submit"
              >
                Guardar
              </loading-button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>
