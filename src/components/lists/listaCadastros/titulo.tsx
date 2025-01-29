import { View, Text } from "react-native";
import { styleTitulo } from "../style";
import ICheckbox from "./interface";
import TituloComOrdenacao from "../tituloComOrdenacao";

interface Props {
    checkbox: ICheckbox;
    setOrdenarPor: (ordem: 'titulo' | 'data' | 'total') => void;
    setOrdemCrescente: (crescente: boolean) => void;
    ordenarPor: 'titulo' | 'data' | 'total';
    ordemCrescente: boolean;
}

export default function Titulo({
    checkbox,
    setOrdenarPor,
    setOrdemCrescente,
    ordenarPor,
    ordemCrescente,
}: Props) {
    return (
        <View style={styleTitulo.viewLinha}>
            <View style={styleTitulo.separator} />
            {checkbox.Título && <>
                <TituloComOrdenacao
                    coluna="titulo"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthTitulo}
                    titulo="Título"
                />
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Data && <>
                <TituloComOrdenacao
                    coluna="data"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthData}
                    titulo="Data Cadastro"
                />
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Total && <>
                <TituloComOrdenacao
                    coluna="total"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthTotal}
                    titulo="Total"
                />
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Funcoes && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Editar</Text>
                <View style={styleTitulo.separator} />
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Excluir</Text>
                <View style={styleTitulo.separator} />
            </>}
        </View>
    );
}
