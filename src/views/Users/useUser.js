import { reactive, computed } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

export default () => {  
   
  const store = useStore();
  const router = useRouter();

  const form = reactive({
    name: "",
    email: "",
    password: "",
    role_id: ""
  });

  const storeCommitSetUser = (field, value) => {
      const user = { ...form };
      user[field] = value;
      store.commit('user/SET_USER', user);
  };

  form.name = computed({
    get: () => store.state.user.user.name,
    set: value =>  storeCommitSetUser("name", value)   
  });

  form.email = computed({
    get: () => store.state.user.user.email,
    set: value => storeCommitSetUser("email", value)
  });

  form.password = computed({
    get: () => store.state.user.user.password,
    set: value => storeCommitSetUser("password", value)
  });
  
  form.role_id = computed({
    get: () => store.state.user.user.role_id,
    set: value => storeCommitSetUser("role_id", value)
  });

  return {
    form,
    router,
    loading: computed(() => store.state.user.loading),
    sending: computed(() => store.state.user.sending),
    roles: computed(() => store.getters["user/roles"]),
    userClean: async () => {
      await store.dispatch("user/cleanUser", {
        name: "",
        email: "",
        password: "",
        role_id: ""
      });            
    },
    userGet: async id => {    
      if (id != store.state.user.user.id) 
        await store.dispatch("user/getUser", id)
    },
    helperTables: async () => {    
      if (store.state.user.helperTables) 
        await store.dispatch("user/helperTables")
    },
    userUpdate: async (userId, form) => {
      await store.dispatch("user/updateUser", { userId, form });
      router.push({ path: '/users' });
    }
  };
  
};

