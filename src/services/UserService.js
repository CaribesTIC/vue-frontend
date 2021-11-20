import * as API from "@/services/API";

export default {
  getUser(userId) {
    return API.apiClient.get(`/users/${userId}`);
  },
  getUsers(page) {
    return API.apiClient.get(`/users/?page=${page}`);
  },
  paginateUsers(link) {
    return API.apiClient.get(link);
  },
  helperTablesGet() {
     return API.apiClient.get(`/user/helperTables`);
  },
  updateUser(userId, form) {
    return API.apiClient.post(`/users/${userId}`, form);
  }
};
