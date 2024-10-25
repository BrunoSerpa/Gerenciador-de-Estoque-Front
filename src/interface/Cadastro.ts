import { AtualizarItem, CadastrarItem } from "./Item";

interface AtualizarCadastro {
    data_cadastro: Date;
    frete?: number;
    itens: AtualizarItem[];
    titulo?: string;
};
interface Cadastro {
    id: number;
    data_cadastro: Date;
    frete?: number;
    titulo?: string;
};

interface CadastrarCadastro {
    data_cadastro: Date;
    frete?: number;
    titulo?: string;
    itens: CadastrarItem[];
};

interface VisualizarCadastro {
    id: number;
    data_cadastro: Date;
    titulo: string;
    total: number;
};

export { AtualizarCadastro, CadastrarCadastro, Cadastro, VisualizarCadastro }