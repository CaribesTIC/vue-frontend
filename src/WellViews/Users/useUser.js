import { reactive, computed } from 'vue'
import { useStore } from 'vuex';

export default () => {  
   
  const store = useStore();

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
    loading: computed(() => store.state.user.loading),
    sending: computed(() => store.state.user.sending),
    roles: computed(() => store.getters["user/roles"]),
    helperTables: async () => {    
      if (store.state.user.helperTables) 
        await store.dispatch("user/helperTables")
    },
    errors: computed(() => 
      Object.assign({
        errors: {
          name: [], email: [], password: [], role_id: []
        }
      }, store.state.flashMessage.error)
    )
  };
  
};

