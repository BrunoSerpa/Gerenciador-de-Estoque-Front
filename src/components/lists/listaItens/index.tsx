import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { listarItens } from "../../../services";
import { VisualizarItem } from "../../../interface/Item";
import { styleLista } from "../style";
import Carregando from "../../carregando";
import Titulo from "./titulo";
import Item from "./item";
import ICheckbox from "./interface";
import { Checkbox } from "../../inputs";

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

    const [showData, setShowData] = useState(true)
    const [showExcluir, setShowExcluir] = useState(true)
    const [showID, setShowID] = useState(true)
    const [showPreco, setShowPreco] = useState(true)
    const checkbox: ICheckbox = {
        Data: showData,
        Excluir: showExcluir,
        ID: showID,
        Preco: showPreco
    }
    return (
        produtos === undefined ?
            <Carregando />
            :
            <>
                <View style={styleLista.viewCheckboxPrincipal}>
                    <View style={styleLista.viewCheckbox}>
                        <Checkbox set={setShowID} status={showID} titulo="Mostrar ID" />
                        <Checkbox set={setShowData} status={showData} titulo="Mostrar Data" />
                    </View>
                    <View style={styleLista.viewCheckbox}>
                        <Checkbox set={setShowExcluir} status={showExcluir} titulo="Mostrar Excluir" />
                        <Checkbox set={setShowPreco} status={showPreco} titulo="Mostrar Preço" />
                    </View>
                </View>
                <ScrollView
                    style={styleLista.scrollView}
                    horizontal={true}
                >
                    <ScrollView
                        horizontal={false}
                    >
                        <Titulo checkbox={checkbox} />
                        {produtos.map((produto) => (
                            <Item
                                item={produto}
                                setRefresh={setRefresh}
                                key={produto.id}
                                checkbox={checkbox}
                            />
                        ))}
                    </ScrollView>
                </ScrollView>
            </>
    );
}
