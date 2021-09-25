import * as Api from "@/apis/Api";

export default {
  getUser(userId) {
    return Api.apiClient.get(`/users/${userId}`);
  },
  getUsers(page) {
    return Api.apiClient.get(`/users/?page=${page}`);
  },
  paginateUsers(link) {
    return Api.apiClient.get(link);
  },
};
