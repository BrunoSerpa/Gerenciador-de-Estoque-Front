import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { listarProdutos } from "../../../services";
import { VisualizarProduto } from "../../../interface/Produto";
import { styleLista } from "../style";
import Carregando from "../../carregando";
import Titulo from "./titulo";
import Item from "./item";
import ListaItem from "../../../pages/listaItem";
import { useFocusEffect } from "@react-navigation/native";
import ICheckbox from "./interface";
import { Checkbox, InputPesquisa } from "../../inputs";

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

    const [showNomes, setShowNomes] = useState(true);
    const [showPreco, setShowPreco] = useState(true);
    const [showQuantidade, setShowQuantidade] = useState(true);
    const [showGarantia, setShowGarantia] = useState(false);
    const [showValidade, setShowValidade] = useState(false);
    const [showMarca, setShowMarca] = useState(false);
    const [showItens, setShowItens] = useState(true);
    const [showFuncoes, setShowFuncoes] = useState(false);
    const checkbox: ICheckbox = {
        Nomes: showNomes,
        Preco: showPreco,
        Quantidade: showQuantidade,
        Garantia: showGarantia,
        Validade: showValidade,
        Marca: showMarca,
        Itens: showItens,
        Funcoes: showFuncoes
    }

    const [nomeProcurado, setNomeProcurado] = useState('')
    const [marcaProcurada, setMarcaProcurada] = useState('')
    return (
        produtos === undefined ?
            <Carregando />
            :
            <>
                <View style={styleLista.viewCheckboxPrincipal}>
                    <View style={styleLista.viewCheckbox}>
                        <InputPesquisa
                            nome={nomeProcurado}
                            set={setNomeProcurado}
                            placeholder="nome"
                            title="Procurar Nome"
                        />
                        <Checkbox set={setShowNomes} status={showNomes} titulo="Mostrar nomes" />
                        <Checkbox set={setShowPreco} status={showPreco} titulo="Mostrar preço" />
                        <Checkbox set={setShowQuantidade} status={showQuantidade} titulo="Mostrar quantidade" />
                        <Checkbox set={setShowGarantia} status={showGarantia} titulo="Mostrar garantia" />
                    </View>
                    <View style={styleLista.viewCheckbox}>
                        <InputPesquisa
                            nome={marcaProcurada}
                            set={setMarcaProcurada}
                            placeholder="marca"
                            title="Procurar Marca"
                        />
                        <Checkbox set={setShowValidade} status={showValidade} titulo="Mostrar validade" />
                        <Checkbox set={setShowMarca} status={showMarca} titulo="Mostrar marca" />
                        <Checkbox set={setShowItens} status={showItens} titulo="Mostrar itens" />
                        <Checkbox set={setShowFuncoes} status={showFuncoes} titulo="Mostrar funções" />
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
                        {produtos.map((produto) =>
                            (
                                nomeProcurado.length < 3 ||
                                produto.nomes.find((nome) => nome.nome.toUpperCase().includes(nomeProcurado.toUpperCase()))
                            ) &&
                            (
                                marcaProcurada.length < 3 ||
                                produto.marca?.nome.toUpperCase().includes(marcaProcurada.toUpperCase())
                            ) &&
                            <Item
                                produto={produto}
                                setRefresh={setRefresh}
                                setListarItens={setListarItens}
                                key={produto.id}
                                checkbox={checkbox}
                            />
                        )}
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