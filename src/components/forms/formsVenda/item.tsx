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

export default function ItemLote(itemLote: Props) {
    return (
        <View style={styleItens.viewLinha}>
            <View style={styleItens.widthProduto}>
                <InputProduto
                    id_nome={itemLote.produto.idProduto}
                    set={(id) => itemLote.setIdProduto(itemLote.index, id)}
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
                    set={(preco) => itemLote.setPreco(itemLote.index, preco)}
                    text={itemLote.produto.preco}
                />
            </View>
            <View style={styleItens.separator} />
            <View style={styleItens.widthQuantidade}>
                <InputDefault
                    keyboardType="numeric"
                    obrigatorio
                    placeholder="0"
                    set={(quantidade) => itemLote.setQuantidade(itemLote.index, quantidade)}
                    text={itemLote.produto.quantidade}
                />
            </View>
        </View>
    )
}