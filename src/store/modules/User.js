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
  sending: false,
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
  SET_SENDING(state, sending) {
    state.sending = sending;
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
  cleanUser({ commit }, form) { 
    UserService.cleanUser(form)
      .then( response => {
        commit("SET_USER", response); 
      });
  },
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
        commit("SET_FLASH_MESSAGE_ERROR", { msg: error.response.data } , { root: true });
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
    UserService.helperTablesGet()
      .then((response) => {        
        commit("SET_ROLES", response.data.roles);
        commit("SET_HELPER_TABLES");        
      })
      .catch((error) => {
        commit("SET_ERROR", getError(error));
      });
  },
  async insertUser({ commit }, { form }) {
    commit("SET_SENDING", true);
    return UserService.insertUser(form)
      .then((response) => {
        commit("SET_USER", form);
        commit("SET_SENDING", false);
        commit("SET_FLASH_MESSAGE_SUCCESS", { msg: response.data.message } , { root: true });
      })
      .catch((error) => {
        commit("SET_SENDING", false);
        commit("SET_FLASH_MESSAGE_ERROR", { msg: error.response.data } , { root: true });
        commit("SET_ERROR", getError(error));
      });
  },
  async updateUser({ commit }, { userId, form }) {
    commit("SET_SENDING", true);
    return UserService.updateUser(userId, form)
      .then((response) => {
        commit("SET_USER", form);
        commit("SET_SENDING", false);
        commit("SET_FLASH_MESSAGE_SUCCESS", { msg: response.data.message } , { root: true });
      })
      .catch((error) => {
        commit("SET_SENDING", false);
        commit("SET_FLASH_MESSAGE_ERROR", { msg: error.message } , { root: true });
        commit("SET_ERROR", getError(error));
      });
  }
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
