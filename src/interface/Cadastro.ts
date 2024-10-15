import { AtualizarItem, CadastrarItem } from "./Item";

interface AtualizarCadastro {
    data_cadastro: Date;
    frete: number;
    titulo: string;
    itens: AtualizarItem[];
};

interface Cadastro {
    id: number;
    data_cadastro: Date;
    frete?: number;
    titulo?: string;
    custo_itens: number;
};

interface CadastrarCadastro {
    data_cadastro: Date;
    frete: number;
    titulo: string;
    itens: CadastrarItem[];
};

interface VisualizarCadastro {
    id: number;
    data_cadastro: Date;
    titulo: string;
    custo_itens: number;
    total: number;
};

export { AtualizarCadastro, Cadastro, CadastrarCadastro, VisualizarCadastro }