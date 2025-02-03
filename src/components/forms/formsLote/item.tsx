import { View } from "react-native";
import { InputDefault, InputProduto } from "../../inputs";
import { styleItens } from "../style";

interface Props {
    produto: {
        idProduto: number,
        preco: string,
        quantidade: string
    },
    index: number,
    setIdProduto: (index: number, idProduto: number) => void,
    setPreco: (index: number, preco: string) => void,
    setQuantidade: (index: number, quantidade: string) => void
}

export default function ItemLote({
    index,
    produto,
    setIdProduto,
    setPreco,
    setQuantidade
}: Readonly<Props>) {
    return (
        <View style={styleItens.viewLinha}>
            <View style={styleItens.widthProduto}>
                <InputProduto
                    id_nome={produto.idProduto}
                    set={(id) => setIdProduto(index, id)}
                    idInicial={0}
                    title={false}
                />
            </View>
            <View style={styleItens.separator} />
            <View style={styleItens.widhtPreco}>
                <InputDefault
                    esquerda
                    keyboardType="number-pad"
                    marcacao="R$"
                    obrigatorio
                    placeholder="0,00"
                    set={(preco) => setPreco(index, preco)}
                    text={produto.preco}
                />
            </View>
            <View style={styleItens.separator} />
            <View style={styleItens.widthQuantidade}>
                <InputDefault
                    keyboardType="numeric"
                    obrigatorio
                    placeholder="0"
                    set={(quantidade) => setQuantidade(index, quantidade)}
                    text={produto.quantidade}
                />
            </View>
        </View>
    )
}