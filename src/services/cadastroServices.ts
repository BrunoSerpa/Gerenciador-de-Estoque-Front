import axios from 'axios';

import { CadastrarCadastro } from '../interface/Cadastro';
import URL from './url';

const Cadastro_URL = `${URL}/cadastro`;

const cadastrarCadastro = async (cadastroData: CadastrarCadastro) => {
  try {
    const response = await axios.post(`${Cadastro_URL}`, cadastroData);
    return response.data;
  } catch (error) {
    throw error;
  };
};

const listarCadastros = async () => {
  try {
    const response = await axios.get(`${Cadastro_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  };
};

const excluirCadastro = async (id: number) => {
  try {
    const response = await axios.delete(`${Cadastro_URL}/${id}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar :', error);
    throw error;
  }
};

export {cadastrarCadastro, listarCadastros, excluirCadastro}