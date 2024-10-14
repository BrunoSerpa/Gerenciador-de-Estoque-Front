import { View, Text } from "react-native";
import { styleTitulo } from "../style";

export default function Titulo() {
    return (
        <View style={styleTitulo.viewLinha}>
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthTitulo]}>Título </Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthDataCadastro]}>Data Cadastro </Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthTotal]}>Total</Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Editar </Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Excluir </Text>
        </View>
    );
}
