import React, { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { listarProdutos } from "../../../services";
import { VisualizarProduto } from "../../../interface/Produto";
import { styleLista } from "../style";
import Carregando from "../../carregando";
import Titulo from "./titulo";
import Item from "./item";
import ListaItem from "../../../pages/listaItem";
import { useFocusEffect } from "@react-navigation/native";

export default function ListaProdutos() {
    const [produtos, setProdutos] = useState<VisualizarProduto[] | undefined>(undefined);
    const [listarItens, setListarItens] = useState<{
        id: number
        nome: string
    } | undefined>(undefined)
    const [refresh, setRefresh] = useState(false);

    const listar = async () => {
        const resposta = await listarProdutos();
        console.log(resposta);
        setProdutos(resposta.data.rows);
    };
    useEffect(() => {
        listar();
        setRefresh(false);
    }, [refresh]);
    useFocusEffect(
        useCallback(() => {
            listar();
        }, [])
    );

    useEffect(() => {
        if (listarItens === undefined) {
            setRefresh(true)
        }
    }, [listarItens])

    const FecharModal = () => {
        setListarItens(undefined)
    }

    return (
        produtos === undefined ?
            <Carregando />
            :
            <>
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
                                produto={produto}
                                setRefresh={setRefresh}
                                setListarItens={setListarItens}
                                key={produto.id}
                            />
                        ))}
                    </ScrollView>
                </ScrollView>
                {listarItens !== undefined &&
                    <ListaItem
                        id_produto={listarItens.id}
                        nome_produto={listarItens.nome}
                        fecharModal={FecharModal}
                    />
                }
            </>
    );
};