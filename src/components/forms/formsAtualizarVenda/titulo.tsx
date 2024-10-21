import { Text, View } from "react-native";
import { styleTitulo } from "../style";

export default function TítuloLote() {
    return (
        <View style={styleTitulo.viewTitulo}>
            <View style={styleTitulo.widthProduto}>
                <Text style={styleTitulo.texts}>Produto</Text>
            </View>
            <View style={styleTitulo.separator} />
            <View style={styleTitulo.widhtPreco}>
                <Text style={styleTitulo.texts}>Preço Unidade</Text>
            </View>
            <View style={styleTitulo.separator} />
            <View style={styleTitulo.widthQuantidade}>
                <Text style={styleTitulo.texts}>Quantidade</Text>
            </View>
        </View>
    )
}