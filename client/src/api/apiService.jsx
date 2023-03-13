import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api";

const apiService = {
  getResData: async () => {
    try {
      const response = await axios.get(`${API_URL}/rest-raw-data`);
      return JSON.parse(response.data);
    } catch (error) {
      console.error(error);
    }
  },

//   getUserById: async (id) => {
//     try {
//       const response = await axios.get(`${API_URL}/users/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   },

  // More API methods here
};

export default apiService;
