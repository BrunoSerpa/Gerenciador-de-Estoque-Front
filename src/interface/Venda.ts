import { AtualizarItem, CadastrarItem } from "./Item";

interface AtualizarVenda {
    data_venda: Date;
    frete?: number;
    titulo?: string;
    itens: AtualizarItem[];
};

interface CadastrarVenda {
    data_venda: Date;
    frete?: number;
    titulo?: string;
    itens: CadastrarItem[];
};

interface Venda {
    id: number;
    data_venda: Date;
    frete?: number;
    titulo?: string;
    custo_itens: number;
};

interface VisualizarVenda {
    id: number;
    data_venda: Date;
    titulo: string;
    total: number;
};

export { AtualizarVenda, CadastrarVenda, Venda, VisualizarVenda }