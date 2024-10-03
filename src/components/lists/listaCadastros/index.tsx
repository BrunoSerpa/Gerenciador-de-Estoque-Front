import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { listarCadastros } from "../../../services";
import { styleLista } from "../style";
import Carregando from "../../carregando";
import Titulo from "./titulo";
import Item from "./item";
import { VisualizarCadastro } from "../../../interface/Cadastro";

export default function ListaCadastros() {
    const [cadastros, setCadastro] = useState<VisualizarCadastro[] | undefined>(undefined);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        const listar = async () => {
            const resposta = await listarCadastros();
            console.log(resposta);
            setCadastro(resposta.data.rows);
        };
        listar();
        setRefresh(false);
    }, [refresh]);



    return (
        cadastros === undefined ?
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
                            <Item
                                cadastro={cadastro}
                                setRefresh={setRefresh}
                                key={cadastro.id}
                            />
                        ))}
                    </ScrollView>
                </ScrollView>
            </>
    );
};