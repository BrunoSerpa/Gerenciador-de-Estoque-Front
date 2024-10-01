import axios from 'axios';
import URL from './url';

const listarNomes = async () => { 
  try {
    const response = await axios.get(`${URL}/nomes`); 
    return response.data;
  } catch (error) {
    throw error;  
  }
};

export {listarNomes}