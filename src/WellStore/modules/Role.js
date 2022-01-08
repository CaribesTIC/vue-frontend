import { getError } from "@/utils/helpers";
import RoleService from "@/services/RoleService";

export const namespaced = true;

function setPaginatedRoles(commit, response) {
  commit("SET_ROLES", response.data.data);
  commit("SET_META", response.data.meta);
  commit("SET_LINKS", response.data.links);
  commit("SET_LOADING", false);
}

export const state = {
  role: {},
  roles: [],
  //help: [],
  meta: null,
  links: null,
  loading: false,
  error: null,
};

export const mutations = {
  SET_ROLE(state, role) {
    state.role = role;
  },
  SET_ROLES(state, roles) {
    state.roles = roles;    
  },
  //SET_HELP(state, roles) {    
  //  state.help = roles;
  //},
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
};

export const actions = {
  getRole({ commit }, role_id) {    
    commit("SET_LOADING", true);
    RoleService.getRole(role_id)
      .then((response) => {
        commit("SET_ROLE", response.data.data);
        commit("SET_LOADING", false);
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(error));
      })
      ;
  },
  /*getRoles({ commit }, page) {
    commit("SET_LOADING", true);
    RoleService.getRoles(page)
      .then((response) => {
        setPaginatedRoles(commit, response);
        commit("SET_HELP", response.data);
        console.log(response.data);
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(error));
      });
  },*/
  paginateRoles({ commit }, link) {
    commit("SET_LOADING", true);
    RoleService.paginateRoles(link)
      .then((response) => {
        setPaginatedRoles(commit, response);
      })
      .catch((error) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(error));
      });
  },
};

export const getters = {
  role: (state) => {
    return state.role;
  },
  roles: (state) => {
    return state.roles;
  },
  /*help: (state) => {
    return state.help;
  },*/
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
};
