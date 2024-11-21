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

    const [ordenarPor, setOrdenarPor] = useState<'nome' | 'preco' | 'quantidade' | 'garantia' | 'validade' | 'marca'>('nome');
    const [ordemCrescente, setOrdemCrescente] = useState(true);
    const ordenarProdutos = (produtos: VisualizarProduto[]) => {
        if (!ordenarPor) return produtos;

        return [...produtos].sort((a, b) => {
            let valorA, valorB;

            switch (ordenarPor) {
                case 'nome':
                    valorA = a.nomes[0]?.nome.toUpperCase() || '';
                    valorB = b.nomes[0]?.nome.toUpperCase() || '';
                    break;
                case 'preco':
                    valorA = a.preco ? parseFloat(a.preco.toString().replace('$', '')) : 0;
                    valorB = b.preco ? parseFloat(b.preco.toString().replace('$', '')) : 0;
                    break;
                case 'quantidade':
                    valorA = a.quantidade || 0;
                    valorB = b.quantidade || 0;
                    break;
                case 'garantia':
                    valorA = a.garantia || 0;
                    valorB = b.garantia || 0;
                    break;
                case 'validade':
                    valorA = a.validade ? new Date(a.validade).getTime() : 0;
                    valorB = b.validade ? new Date(b.validade).getTime() : 0;
                    break;
                case 'marca':
                    valorA = a.marca?.nome.toUpperCase() || '';
                    valorB = b.marca?.nome.toUpperCase() || '';
                    break;
                default:
                    return 0;
            }

            if (valorA < valorB) return ordemCrescente ? -1 : 1;
            if (valorA > valorB) return ordemCrescente ? 1 : -1;
            return 0;
        });
    };
    const produtosOrdenados = produtos ? ordenarProdutos(produtos) : [];

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
                        <Titulo
                            checkbox={checkbox}
                            setOrdenarPor={setOrdenarPor}
                            setOrdemCrescente={setOrdemCrescente}
                            ordenarPor={ordenarPor}
                            ordemCrescente={ordemCrescente}
                        />
                        {produtosOrdenados.map((produto) =>
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