import { View, Text, Pressable } from "react-native";
import { styleTitulo } from "../style";
import ICheckbox from "./interface";

interface Props {
    checkbox: ICheckbox;
    setOrdenarPor: (ordem: 'nome' | 'preco' | 'quantidade' | 'garantia' | 'validade' | 'marca') => void;
    setOrdemCrescente: (crescente: boolean) => void;
    ordenarPor: 'nome' | 'preco' | 'quantidade' | 'garantia' | 'validade' | 'marca' | null;
    ordemCrescente: boolean;
}

export default function Titulo({
    checkbox,
    setOrdenarPor,
    setOrdemCrescente,
    ordenarPor,
    ordemCrescente
}: Props) {
    const renderTituloComOrdenacao = (titulo: string, coluna: 'nome' | 'preco' | 'quantidade' | 'garantia' | 'validade' | 'marca', style: any) => (
        <Pressable
            onPress={() => {
                if (ordenarPor === coluna) {
                    setOrdemCrescente(!ordemCrescente);
                } else {
                    setOrdenarPor(coluna);
                    setOrdemCrescente(true); coluna
                }
            }}
        >
            <Text style={style}>
                {titulo}
                {ordenarPor === coluna && (ordemCrescente ? " ▲" : " ▼")}
            </Text>
        </Pressable>
    );

    return (
        <View style={styleTitulo.viewLinha}>
            <View style={styleTitulo.separator} />
            {checkbox.Nomes && <>
                {renderTituloComOrdenacao("Nomes", "nome", [styleTitulo.textTitulo, styleTitulo.widthNomes])}
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Preco && <>
                {renderTituloComOrdenacao("Preço", "preco", [styleTitulo.textTitulo, styleTitulo.widthPreco])}
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Quantidade && <>
                {renderTituloComOrdenacao("Quantidade", "quantidade", [styleTitulo.textTitulo, styleTitulo.widthQuantidade])}
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Garantia && <>
                {renderTituloComOrdenacao("Garantia", "garantia", [styleTitulo.textTitulo, styleTitulo.widthGarantia])}
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Validade && <>
                {renderTituloComOrdenacao("Validade", "validade", [styleTitulo.textTitulo, styleTitulo.widthValidade])}
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Marca && <>
                {renderTituloComOrdenacao("Marca", "marca", [styleTitulo.textTitulo, styleTitulo.widthMarca])}
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Itens && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Itens </Text>
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Funcoes && <>
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Editar </Text>
                <View style={styleTitulo.separator} />
                <Text style={[styleTitulo.textTitulo, styleTitulo.widthFuncoes]}>Excluir </Text>
                <View style={styleTitulo.separator} />
            </>}
        </View>
    );
};