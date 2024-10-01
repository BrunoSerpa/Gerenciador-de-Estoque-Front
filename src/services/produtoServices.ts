import axios from 'axios';

import { CadastrarProduto } from '../types/Produto';
import URL from './url';

const Produto_URL = `${URL}/produto`;

const cadastrarProduto = async (produtoData: CadastrarProduto) => {
  try {
    const response = await axios.post(`${Produto_URL}`, produtoData);
    return response.data;
  } catch (error) {
    throw error;
  };
};

const listarProdutos = async () => {
  try {
    const response = await axios.get(`${Produto_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  };
};

const excluirProduto = async (id: number) => {
  try {
    const response = await axios.delete(`${Produto_URL}/${id}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
};

export {cadastrarProduto, listarProdutos, excluirProduto}