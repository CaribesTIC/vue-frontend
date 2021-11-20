import { getError } from "@/utils/helpers";
import UserService from "@/services/UserService";

export const namespaced = true;

function setPaginatedUsers(commit, response) {
  commit("SET_USERS", response.data.data);
  commit("SET_META", response.data.meta);
  commit("SET_LINKS", response.data.links);
  commit("SET_LOADING", false);
}

export const state = {
  user: {},
  users: [],  
  meta: null,
  links: null,
  loading: false,
  error: null,
  helperTables : true,
  roles: []
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_META(state, meta) {
    state.meta = meta;
  },
  SET_LINKS(state, links) {
    state.links = links;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_ROLES(state, roles) {
    state.roles = roles;
  },
  SET_HELPER_TABLES(state) {
    state.helperTables = false;
  },
};

export const actions = {
  getUser({ commit }, user_id) {    
    commit("SET_LOADING", true);
    UserService.getUser(user_id)
      .then((response) => {
        commit("SET_USER", response.data.data);
        commit("SET_LOADING", false);
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(error));
      });
  },
  getUsers({ commit }, page) {
    commit("SET_LOADING", true);
    UserService.getUsers(page)
      .then((response) => {
        setPaginatedUsers(commit, response);
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(error));
      });
  },
  paginateUsers({ commit }, link) {
    commit("SET_LOADING", true);
    UserService.paginateUsers(link)
      .then((response) => {
        setPaginatedUsers(commit, response);
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(error));
      });
  },
  helperTables({ commit }) {
    commit("SET_LOADING", true);
    UserService.helperTablesGet()
      .then((response) => {        
        commit("SET_ROLES", response.data.roles);
        commit("SET_HELPER_TABLES");        
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(error));
      });
  },
  updateUser({ commit }, { userId, form }) {
    //commit("SET_LOADING", true);
    UserService.updateUser(userId, form)
      .then((response) => {
        commit("SET_USER", form);
       // commit("SET_LOADING", false);
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(error));
      });  }

};

export const getters = {
  user: (state) => {
    return state.user;
  },
  users: (state) => {
    return state.users;
  },
  meta: (state) => {
    return state.meta;
  },
  links: (state) => {
    return state.links;
  },
  loading: (state) => {
    return state.loading;
  },
  error: (state) => {
    return state.error;
  },
  roles: (state) => {
    return state.roles;
  },
};
