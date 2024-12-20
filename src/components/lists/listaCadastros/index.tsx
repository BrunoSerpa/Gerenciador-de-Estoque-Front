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
    }

    const [tituloProcurado, setTituloProcurado] = useState('')

    const [showFiltroHistorico, setShowFiltroHistorico] = useState(false)
    const [tipoHistorico, setTipoHistorico] = useState(0)
    return (
        (cadastros === undefined || vendas === undefined) ?
            <Carregando />
            :
            <>
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
                <ScrollView
                    style={styleLista.scrollView}
                    horizontal={true}
                >
                    <ScrollView
                        horizontal={false}
                    >
                        <Titulo checkbox={checkbox} />
                        {(!showFiltroHistorico || tipoHistorico === 0) &&
                            cadastros.map((cadastro) => (
                                (tituloProcurado.length < 3 || cadastro.titulo.toUpperCase().includes(tituloProcurado.toUpperCase())) &&
                                <ItemCadastro
                                    cadastro={cadastro}
                                    setRefresh={setRefresh}
                                    key={cadastro.id}
                                    checkbox={checkbox}
                                />
                            ))}
                        {(!showFiltroHistorico || tipoHistorico === 1) &&
                            vendas.map((venda) => (
                                (tituloProcurado.length < 3 || venda.titulo.toUpperCase().includes(tituloProcurado.toUpperCase())) &&
                                <ItemVenda
                                    venda={venda}
                                    setRefresh={setRefresh}
                                    key={venda.id}
                                    checkbox={checkbox}
                                />
                            ))}
                    </ScrollView>
                </ScrollView>
            </>
    );
};