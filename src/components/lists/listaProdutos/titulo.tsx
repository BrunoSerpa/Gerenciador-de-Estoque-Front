import { View, Text } from "react-native";
import { styleTitulo } from "../style";
import ICheckbox from "./interface";
import TituloComOrdenacao from "../tituloComOrdenacao";


interface Props {
    checkbox: ICheckbox;
    setOrdenarPor: (ordem: 'nome' | 'preco' | 'quantidade' | 'garantia' | 'validade' | 'marca') => void;
    setOrdemCrescente: (crescente: boolean) => void;
    ordenarPor: 'nome' | 'preco' | 'quantidade' | 'garantia' | 'validade' | 'marca';
    ordemCrescente: boolean;
}

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
            {checkbox.Nomes && <>
                <TituloComOrdenacao
                    coluna="nome"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthNomes}
                    titulo="Nomes"
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
            {checkbox.Quantidade && <>
                <TituloComOrdenacao
                    coluna="quantidade"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthQuantidade}
                    titulo="Quantidade"
                />
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Garantia && <>
                <TituloComOrdenacao
                    coluna="garantia"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthGarantia}
                    titulo="Garantia"
                />
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Validade && <>
                <TituloComOrdenacao
                    coluna="validade"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthValidade}
                    titulo="Validade"
                />
                <View style={styleTitulo.separator} />
            </>}
            {checkbox.Marca && <>
                <TituloComOrdenacao
                    coluna="marca"
                    setOrdemCrescente={setOrdemCrescente}
                    setOrdenarPor={setOrdenarPor}
                    ordemCrescente={ordemCrescente}
                    ordenarPor={ordenarPor}
                    style={styleTitulo.widthMarca}
                    titulo="Marca"
                />
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