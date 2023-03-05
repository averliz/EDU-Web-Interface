const API_URL = 'http://localhost:8000';

export const getNLPData = async () => {
  const response = await fetch(`${API_URL}/nlp`);
  const data = await response.json();
  return data;
};
