import { View, Text } from "react-native";
import { styleTitulo } from "../style";
import ICheckbox from "./interface";
import TituloComOrdenacao from "../tituloComOrdenacao";
import { VisualizarItem } from "../../../interface/Item";

interface Props {
    checkbox: ICheckbox;
    setOrdenarPor: (ordem: keyof VisualizarItem) => void;
    setOrdemCrescente: (crescente: boolean) => void;
    ordenarPor: keyof VisualizarItem;
    ordemCrescente: boolean;
};

export default function Titulo({
    checkbox,
    setOrdenarPor,
    setOrdemCrescente,
    ordenarPor,
    ordemCrescente
}: Props) {
    return (
        <View style={styleTitulo.viewLinha}>
            <View style={styleTitulo.separator} />
            {checkbox.ID && <>
                <TituloComOrdenacao
                    coluna="id"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthId}
                    titulo="ID"
                />
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Preco && <>
                <TituloComOrdenacao
                    coluna="preco"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthPreco}
                    titulo="Preço"
                />
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Data && <>
                <TituloComOrdenacao
                    coluna="data_compra"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthData}
                    titulo="Data Cadastro"
                />
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Excluir && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Excluir </Text>
                <View style={styleTitulo.separator} />
            </>}
        </View>
    );
};