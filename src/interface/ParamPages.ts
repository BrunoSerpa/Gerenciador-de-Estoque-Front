export default interface ParamPages {
    [key: string]: object | undefined;
    "Histórico de Cadastro": {};
    "Lista de Produtos": {};
    "Cadastro de Produto": {};
    "Cadastro de Itens": { produtoId?: number };
    "Cadastro em Lote": {};
    "Atualizar Cadastro": { cadastroId: number };
    "Atualizar Produto": { produtoId: number };
};