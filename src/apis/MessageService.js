import * as Api from "@/apis/Api";

export default {
  getMessages(page) {
    return Api.apiClient.get(`/messages/?page=${page}`);
  },
  postMessage(payload) {
    return Api.apiClient.post("/messages", payload);
  },
  paginateMessages(link) {
    return Api.apiClient.get(link);
  },
};
