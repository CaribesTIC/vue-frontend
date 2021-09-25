import * as Api from "@/apis/Api";

export default {
  uploadFile(payload) {
    return Api.apiClient.post(payload.endpoint, payload.file);
  },
};
