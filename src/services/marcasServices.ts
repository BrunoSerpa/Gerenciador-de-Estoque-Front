import axios from 'axios';
import URL from './url';

const listarMarcas = async () => { 
  try {
    const response = await axios.get(`${URL}/marcas`); 
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export {listarMarcas}