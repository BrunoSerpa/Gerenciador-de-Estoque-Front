import { View, Text } from "react-native";
import { styleTitulo } from "../style";

export default function Titulo() {
    return (
        <View style={styleTitulo.viewLinha}>
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthNomes]}>Nomes </Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthPreco]}>Preço </Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthQuantidade]}>Quantidade </Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthGarantia]}>Garantia </Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthValidade]}>Validade </Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthMarca]}>Marca </Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Itens </Text>
            <View style={styleTitulo.separator} />
            <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Excluir </Text>
        </View>
    );
}
