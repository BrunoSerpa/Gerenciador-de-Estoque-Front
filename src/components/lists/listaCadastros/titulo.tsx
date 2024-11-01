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
            {titulo.checkbox.Título && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthTitulo]}>Título</Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Data && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthData]}>Data</Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Total && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthTotal]}>Total</Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Funcoes && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Editar</Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Funcoes && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Excluir</Text>
                <View style={styleTitulo.separator} />
            </>}
        </View>
    );
}
