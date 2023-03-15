import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
const API_URL_REST_14 = `${API_URL}/rest-raw-data`;

const apiService = {
  getResData: async (selectedOption) => {
    try {
      const response = await axios.get(API_URL_REST_14);
      const jsonResponse = JSON.parse(response.data);

      switch (selectedOption) {
        case "hard":
          return jsonResponse.hard;
        case "test":
          return jsonResponse.test;
        default:
          return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
export default apiService;