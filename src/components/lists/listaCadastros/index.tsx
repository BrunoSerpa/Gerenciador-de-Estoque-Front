import { useCallback, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { listarCadastros, listarVendas } from "../../../services";
import { styleLista } from "../style";
import Carregando from "../../carregando";
import Titulo from "./titulo";
import { VisualizarCadastro } from "../../../interface/Cadastro";
import { useFocusEffect } from "@react-navigation/native";
import { VisualizarVenda } from "../../../interface/Venda";
import ItemCadastro from "./itemCompra";
import ItemVenda from "./itemVenda";
import ICheckbox from "./interface";
import { Checkbox, InputPesquisa, RadioButton } from "../../inputs";

export default function ListaCadastros() {
    const [cadastros, setCadastros] = useState<VisualizarCadastro[] | undefined>(undefined);
    const [vendas, setVendas] = useState<VisualizarVenda[] | undefined>(undefined);
    const [refresh, setRefresh] = useState(false);
    const listarCadastro = async () => {
        const resposta = await listarCadastros();
        console.log(resposta);
        setCadastros(resposta.data.rows);
    };

    const listarVenda = async () => {
        const resposta = await listarVendas();
        console.log(resposta);
        setVendas(resposta.data.rows);
    };

    useEffect(() => {
        listarCadastro();
        listarVenda();
        setRefresh(false);
    }, [refresh]);

    useFocusEffect(
        useCallback(() => {
            listarCadastro();
            listarVenda();
        }, [])
    );

    const [showTitulo, setShowTitulo] = useState(true);
    const [showData, setShowData] = useState(true);
    const [showTotal, setShowTotal] = useState(true);
    const [showFuncoes, setShowFuncoes] = useState(true);
    const checkbox: ICheckbox = {
        Título: showTitulo,
        Data: showData,
        Total: showTotal,
        Funcoes: showFuncoes,
    };

    const [tituloProcurado, setTituloProcurado] = useState('');

    const [showFiltroHistorico, setShowFiltroHistorico] = useState(false);
    const [tipoHistorico, setTipoHistorico] = useState(0);

    const dadosCombinados = cadastros && vendas ? [...cadastros, ...vendas] : [];

    const [ordenarPor, setOrdenarPor] = useState<'titulo' | 'data' | 'total'>('titulo');
    const [ordemCrescente, setOrdemCrescente] = useState(true);

    const getValor = (item: VisualizarCadastro | VisualizarVenda, key: 'titulo' | 'data' | 'total') => {
        if (key === 'titulo') return item.titulo;
        if (key === 'data') return 'data_cadastro' in item ? item.data_cadastro : item.data_venda;
        if (key === 'total') return item.total;
        return '';
    };

    const compararValores = (a: string | number | Date, b: string | number | Date) => {
        if (typeof a === 'string' && typeof b === 'string') {
            return ordemCrescente
                ? a.toUpperCase().localeCompare(b.toUpperCase())
                : b.toUpperCase().localeCompare(a.toUpperCase());
        }
        if (a instanceof Date && b instanceof Date) {
            return ordemCrescente
                ? new Date(a).getTime() - new Date(b).getTime()
                : new Date(b).getTime() - new Date(a).getTime();
        }
        if (typeof a === 'number' && typeof b === 'number') {
            return ordemCrescente ? a - b : b - a;
        }
        return 0;
    };

    const ordenarDados = (dados: (VisualizarCadastro | VisualizarVenda)[]) => {
        return dados.sort((a, b) => {
            const valorA = getValor(a, ordenarPor);
            const valorB = getValor(b, ordenarPor);
            return compararValores(valorA, valorB);
        });
    };


    const dadosFiltrados = dadosCombinados.filter(item => {
        return tituloProcurado.length < 3 || item.titulo.toUpperCase().includes(tituloProcurado.toUpperCase());
    });

    const dadosOrdenados = ordenarDados(dadosFiltrados);

    return (
        (cadastros === undefined || vendas === undefined) ?
            <Carregando />
            :
            <View>
                <View style={styleLista.viewCheckboxPrincipal}>
                    <View style={styleLista.viewCheckbox}>
                        <InputPesquisa
                            nome={tituloProcurado}
                            set={setTituloProcurado}
                            placeholder="nome"
                            title="Procurar Título"
                        />
                        <Checkbox set={setShowFiltroHistorico} status={showFiltroHistorico} titulo="Filtrar tipo" />
                        {showFiltroHistorico &&
                            <RadioButton titulo="Tipo Histórico" set={setTipoHistorico} status={tipoHistorico} subtitulos={["Cadastrados", "Vendidos"]} />
                        }
                    </View>
                    <View style={styleLista.viewCheckbox}>
                        <Checkbox set={setShowTitulo} status={showTitulo} titulo="Mostrar Título" />
                        <Checkbox set={setShowData} status={showData} titulo="Mostrar Data" />
                        <Checkbox set={setShowTotal} status={showTotal} titulo="Mostrar Total" />
                        <Checkbox set={setShowFuncoes} status={showFuncoes} titulo="Mostrar Funções" />
                    </View>
                </View>
                <ScrollView style={styleLista.scrollView} horizontal={true}>
                    <ScrollView horizontal={false}>
                        <Titulo
                            checkbox={checkbox}
                            setOrdenarPor={setOrdenarPor}
                            setOrdemCrescente={setOrdemCrescente}
                            ordenarPor={ordenarPor}
                            ordemCrescente={ordemCrescente}
                        />
                        {dadosOrdenados.map((item, index) => {
                            if ('data_cadastro' in item) {
                                return (
                                    <ItemCadastro
                                        cadastro={item as VisualizarCadastro}
                                        setRefresh={setRefresh}
                                        key={index}
                                        checkbox={checkbox}
                                    />
                                );
                            }
                            if ('data_venda' in item) {
                                return (
                                    <ItemVenda
                                        venda={item as VisualizarVenda}
                                        setRefresh={setRefresh}
                                        key={index}
                                        checkbox={checkbox}
                                    />
                                );
                            }
                            return null;
                        })}
                    </ScrollView>
                </ScrollView>
            </View>
    );
};
