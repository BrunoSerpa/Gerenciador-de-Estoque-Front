import { View, Text } from "react-native";
import { styleTitulo } from "../style";
import ICheckbox from "./interface";

interface Props {
    checkbox: ICheckbox
}

export default function Titulo(titulo: Props) {
    return (
        <View style={styleTitulo.viewLinha}>
            <View style={styleTitulo.separator} />
            {titulo.checkbox.Nomes && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthNomes]}>Nomes </Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Preco && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthPreco]}>Preço </Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Quantidade && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthQuantidade]}>Quantidade </Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Garantia && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthGarantia]}>Garantia </Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Validade && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthValidade]}>Validade </Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Marca && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthMarca]}>Marca </Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Itens && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Itens </Text>
                <View style={styleTitulo.separator} />
            </>}
            {titulo.checkbox.Funcoes && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Editar </Text>
                <View style={styleTitulo.separator} />
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Excluir </Text>
                <View style={styleTitulo.separator} />
            </>}
        </View>
    );
}
