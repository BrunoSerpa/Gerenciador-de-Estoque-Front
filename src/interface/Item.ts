interface AtualizarItem {
    id_produto: number;
    preco: number;
};

interface CadastrarItem {
    id_produto: number;
    preco: number;
};

interface Item {
    id: number;
    id_cadastro: number;
    id_produto: number;
    id_venda?: number;
    data_compra: Date;
    preco: number;
    preco_venda?: number;
};

interface VisualizarItem {
    id: number;
    data_compra: Date;
    preco: number;
};

export { AtualizarItem, CadastrarItem, Item, VisualizarItem };