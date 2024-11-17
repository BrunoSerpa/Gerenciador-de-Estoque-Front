import { View, Text } from "react-native";
import { styleTitulo } from "../style";
import ICheckbox from "./interface";

interface Props {
    checkbox: ICheckbox;
}

export default function Titulo(titulo: Props) {
    return (
        <View style={styleTitulo.viewLinha}>
            <View style={styleTitulo.separator} />
            {titulo.checkbox.ID && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthId]}>ID </Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Preco && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthPreco]}>Preço </Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Data && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthData]}>Data Cadastro </Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Excluir && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Excluir </Text>
                <View style={styleTitulo.separator} />
            </>}
        </View>
    );
}
