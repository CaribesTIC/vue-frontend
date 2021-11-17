import * as API from "@/services/API";

export default {
  getRoles() {
    return API.apiClient.get(`/roles`);
  }  
};
