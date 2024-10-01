import { cadastrarCadastro, excluirCadastro, listarCadastros } from "./cadastroServices";
import { excluirItem, listarItens } from "./itensServices";
import { listarMarcas } from "./marcasServices";
import { listarNomes } from "./nomesServices";
import { cadastrarProduto, excluirProduto, listarProdutos } from "./produtoServices";

export {
    cadastrarCadastro,
    cadastrarProduto,
    excluirCadastro,
    excluirItem,
    excluirProduto,
    listarCadastros,
    listarMarcas,
    listarNomes,
    listarItens,
    listarProdutos
}