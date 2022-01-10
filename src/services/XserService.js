import * as API from "@/services/API";

export default {    
  getXsers(query) {  
    return API.apiClient.get(`/xsers/?${query}`);
  }  
};
