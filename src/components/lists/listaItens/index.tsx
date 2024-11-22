import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { listarItens } from "../../../services";
import { VisualizarItem } from "../../../interface/Item";
import { styleLista } from "../style";
import Carregando from "../../carregando";
import Titulo from "./titulo";
import Item from "./item";
import ICheckbox from "./interface";
import { Checkbox, InputData } from "../../inputs";

interface Props {
    id_produto: number;
};

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

    const [showData, setShowData] = useState(true);
    const [showExcluir, setShowExcluir] = useState(true);
    const [showID, setShowID] = useState(true);
    const [showPreco, setShowPreco] = useState(true);

    const checkbox: ICheckbox = {
        Data: showData,
        Excluir: showExcluir,
        ID: showID,
        Preco: showPreco
    };

    const [dataInicio, setDataInicio] = useState<Date | undefined>(undefined);
    const [dataFim, setDataFim] = useState<Date | undefined>(undefined);
    const [ordenarPor, setOrdenarPor] = useState<keyof VisualizarItem>("id");
    const [ordemCrescente, setOrdemCrescente] = useState(true);
    
    const ordenarItens = (a: VisualizarItem, b: VisualizarItem) => {
        
        if (!(ordenarPor in a) || !(ordenarPor in b)) {
            console.error(`Coluna inválida: ${ordenarPor}`);
            return 0;
        }
    
        let valorA: any = a[ordenarPor];
        let valorB: any = b[ordenarPor];

        if (ordenarPor === "data_compra") {
            valorA = new Date(valorA).getTime();
            valorB = new Date(valorB).getTime();
        }
    
        if (valorA < valorB) return ordemCrescente ? -1 : 1;
        if (valorA > valorB) return ordemCrescente ? 1 : -1;
        return 0;
    };
    

    return (
        produtos === undefined ?
            <Carregando />
            :
            <>
                <View style={styleLista.viewCheckboxPrincipal}>
                    <View style={styleLista.viewCheckbox}>
                        <Checkbox set={setShowID} status={showID} titulo="Mostrar ID" />
                        <Checkbox set={setShowData} status={showData} titulo="Mostrar Data" />
                        <Checkbox set={setShowExcluir} status={showExcluir} titulo="Mostrar Excluir" />
                        <Checkbox set={setShowPreco} status={showPreco} titulo="Mostrar Preço" />
                    </View>
                    <View style={styleLista.viewCheckbox}>
                        <InputData data={dataInicio} set={setDataInicio} title="Data Início" />
                        <InputData data={dataFim} set={setDataFim} title="Data Fim" />
                    </View>
                </View>
                <ScrollView
                    style={styleLista.scrollView}
                    horizontal={true}
                >
                    <ScrollView
                        horizontal={false}
                    >
                        <Titulo
                            checkbox={checkbox}
                            setOrdenarPor={setOrdenarPor}
                            setOrdemCrescente={setOrdemCrescente}
                            ordenarPor={ordenarPor}
                            ordemCrescente={ordemCrescente}
                        />
                        {produtos.sort(ordenarItens).map((produto) =>
                            (dataInicio ? new Date(produto.data_compra).getTime() >= dataInicio.getTime() : true) &&
                            (dataFim ? new Date(produto.data_compra).getTime() <= dataFim.getTime() : true) &&
                            <Item
                                item={produto}
                                setRefresh={setRefresh}
                                key={produto.id}
                                checkbox={checkbox}
                            />
                        )}

                    </ScrollView>
                </ScrollView>
            </>
    );
}
