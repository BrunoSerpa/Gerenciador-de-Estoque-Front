import { NomeVisualizar } from "./Nome";
import { Marca } from "./Marca";

interface AtualizarProduto {
    nomes: string[];
    marca?: number | string;
    garantia: number;
    preco: number;
    validade?: number;
};

interface CadastrarProduto {
    nomes: string[];
    marca?: number | string;
    garantia: number;
    preco: number;
    validade?: number;
};

interface Produto {
    id: number;
    id_marca?: number;
    garantia: number;
    validade?: number;
    preco: number;
    quantidade: number;
};

interface VisualizarProduto {
    id: number;
    nomes: NomeVisualizar[];
    garantia: number;
    validade?: number;
    preco: number;
    quantidade: number;
    marca?: Marca;
};

export { AtualizarProduto, CadastrarProduto, VisualizarProduto, Produto };