export default interface ParamPages {
    [key: string]: object | undefined;
    "Histórico de Cadastro": {};
    "Lista de Produtos": {};
    "Cadastro de Produto": {};
    "Cadastro de Itens": { produtoId?: number };
    "Cadastro em Lote": {};
    "Cadastro de Venda": {};
    "Atualizar Cadastro": { cadastroId: number };
    "Atualizar Venda": { vendaId: number };
    "Atualizar Produto": { produtoId: number };
};