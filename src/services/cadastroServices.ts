import axios from 'axios';

import { AtualizarCadastro, CadastrarCadastro } from '../interface/Cadastro';
import URL from './url';

const Cadastro_URL = `${URL}/cadastro`;

const atualizarCadastro = async (atualizarData: AtualizarCadastro, id: number) => {
  try {
    const response = await axios.patch(`${Cadastro_URL}/${id}`, atualizarData);
    return response.data;
  } catch (error) {
    throw error;
  };
};

const cadastrarCadastro = async (cadastroData: CadastrarCadastro) => {
  try {
    const response = await axios.post(`${Cadastro_URL}`, cadastroData);
    return response.data;
  } catch (error) {
    throw error;
  };
};

const excluirCadastro = async (id: number) => {
  try {
    const response = await axios.delete(`${Cadastro_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar :', error);
    throw error;
  }
};

const listarCadastro = async (id: number) => {
  try {
    const response = await axios.get(`${Cadastro_URL}/${id}`);
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

export { atualizarCadastro, cadastrarCadastro, excluirCadastro, listarCadastro, listarCadastros }