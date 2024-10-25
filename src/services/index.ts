import { atualizarCadastro, cadastrarCadastro, excluirCadastro, listarCadastro, listarCadastros } from "./cadastroServices";
import { excluirItem, listarItens } from "./itensServices";
import { listarMarcas } from "./marcasServices";
import { listarNomes } from "./nomesServices";
import { atualizarProduto, cadastrarProduto, excluirProduto, listarProduto, listarProdutos } from "./produtoServices";
import { atualizarVenda, cadastrarVenda, excluirVenda, listarVenda, listarVendas } from "./vendaServices";

export {
    atualizarProduto,
    atualizarCadastro,
    atualizarVenda,
    cadastrarCadastro,
    cadastrarProduto,
    cadastrarVenda,
    excluirCadastro,
    excluirItem,
    excluirProduto,
    excluirVenda,
    listarCadastro,
    listarCadastros,
    listarMarcas,
    listarNomes,
    listarItens,
    listarProduto,
    listarProdutos,
    listarVenda,
    listarVendas
}