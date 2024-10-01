import axios from 'axios';

import URL from './url';

const Item_URL = `${URL}/item`;

const listarItens = async (id_produto: number) => {
  try {
    const response = await axios.get(`${Item_URL}/${id_produto}`);
    return response.data;
  } catch (error) {
    throw error;
  };
};

const excluirItem = async (id: number) => {
  try {
    const response = await axios.delete(`${Item_URL}/${id}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar :', error);
    throw error;
  }
};

export {listarItens, excluirItem}