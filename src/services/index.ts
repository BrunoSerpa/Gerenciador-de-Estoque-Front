import { atualizarCadastro, cadastrarCadastro, excluirCadastro, listarCadastro, listarCadastros } from "./cadastroServices";
import { excluirItem, listarItens } from "./itensServices";
import { listarMarcas } from "./marcasServices";
import { listarNomes } from "./nomesServices";
import { atualizarProduto, cadastrarProduto, excluirProduto, listarProduto, listarProdutos } from "./produtoServices";

export {
    atualizarProduto,
    atualizarCadastro,
    cadastrarCadastro,
    cadastrarProduto,
    excluirCadastro,
    excluirItem,
    excluirProduto,
    listarCadastro,
    listarCadastros,
    listarMarcas,
    listarNomes,
    listarItens,
    listarProduto,
    listarProdutos
}