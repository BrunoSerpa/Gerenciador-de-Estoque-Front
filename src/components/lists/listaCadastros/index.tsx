import { useCallback, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { listarCadastros, listarVendas } from "../../../services";
import { styleLista } from "../style";
import Carregando from "../../carregando";
import Titulo from "./titulo";
import { VisualizarCadastro } from "../../../interface/Cadastro";
import { useFocusEffect } from "@react-navigation/native";
import { VisualizarVenda } from "../../../interface/Venda";
import ItemCadastro from "./itemCompra";
import ItemVenda from "./itemVenda";

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

    return (
        (cadastros === undefined || vendas === undefined) ?
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
                        {cadastros.map((cadastro) => (
                            <ItemCadastro
                                cadastro={cadastro}
                                setRefresh={setRefresh}
                                key={cadastro.id}
                            />
                        ))}
                        {vendas.map((venda) => (
                            <ItemVenda
                                venda={venda}
                                setRefresh={setRefresh}
                                key={venda.id}
                            />
                        ))}
                    </ScrollView>
                </ScrollView>
            </>
    );
};