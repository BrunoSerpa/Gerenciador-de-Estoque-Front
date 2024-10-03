import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { listarItens } from "../../../services";
import { VisualizarItem } from "../../../interface/Item";
import { styleLista } from "../style";
import Carregando from "../../carregando";
import Titulo from "./titulo";
import Item from "./item";

interface Props {
    id_produto: number
}

export default function ListaItens(item: Props) {
    const [produtos, setProdutos] = useState<VisualizarItem[] | undefined>(undefined);

    const [refresh, setRefresh] = useState(true);
    useEffect(() => {
        const listar = async () => {
            const resposta = await listarItens(item.id_produto);
            console.log(resposta);
            setProdutos(resposta.data.rows);
        };
        listar();
        setRefresh(false);
    }, [refresh]);

    return (
        produtos === undefined ?
            <Carregando />
            :
            <ScrollView
                style={styleLista.scrollView}
                horizontal={true}
            >
                <ScrollView
                    horizontal={false}
                >
                    <Titulo />
                    {produtos.map((produto) => (
                        <Item
                            item={produto}
                            setRefresh={setRefresh}
                            key={produto.id}
                        />
                    ))}
                </ScrollView>
            </ScrollView>
    );
}
