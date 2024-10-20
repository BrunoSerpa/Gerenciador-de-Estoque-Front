import axios from 'axios';

import URL from './url';
import { AtualizarVenda, CadastrarVenda } from '../interface/Venda';

const Venda_URL = `${URL}/venda`;

const atualizarVenda = async (atualizarData: AtualizarVenda, id: number) => {
  try {
    const response = await axios.patch(`${Venda_URL}/${id}`, atualizarData);
    return response.data;
  } catch (error) {
    throw error;
  };
};

const cadastrarVenda = async (vendaData: CadastrarVenda) => {
  try {
    const response = await axios.post(`${Venda_URL}`, vendaData);
    return response.data;
  } catch (error) {
    throw error;
  };
};

const excluirVenda = async (id: number) => {
  try {
    const response = await axios.delete(`${Venda_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar :', error);
    throw error;
  }
};

const listarVenda = async (id: number) => {
  try {
    const response = await axios.get(`${Venda_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  };
};

const listarVendas = async () => {
  try {
    const response = await axios.get(`${Venda_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  };
};

export { atualizarVenda, cadastrarVenda, excluirVenda, listarVenda, listarVendas }