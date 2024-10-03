import { View, Text, Image, Pressable } from "react-native";
import { VisualizarItem } from "../../../interface/Item";
import { styleItem } from "../style";
import { excluirItem } from "../../../services";

interface Props {
    item: VisualizarItem;
    setRefresh: (refresh: boolean) => void;
}
export default function Item(item: Props) {
    const deletarProduto = async () => {
        const excluir = await excluirItem(item.item.id)
        console.log(excluir);
        item.setRefresh(true);
    };

    const formatarData = (data: any) => {
        const dataObj = new Date(data);
        if (isNaN(dataObj.getTime())) {
            return 'Data inválida';
        }
        return dataObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <View style={styleItem.viewLinha}>
            <Text style={[styleItem.textItem, styleItem.widthId]}>{item.item.id}</Text>
            <View style={styleItem.separator} />
            <Text style={[styleItem.textItem, styleItem.widthPreco]}>{item.item.preco}</Text>
            <View style={styleItem.separator} />
            <Text style={[styleItem.textItem, styleItem.widthDataCadastro]}>{formatarData(item.item.data_compra)}</Text>
            <View style={styleItem.separator} />
            <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                <Pressable onPress={deletarProduto}>
                    <Image
                        source={require("../../../../assets/trash.png")}
                        style={styleItem.funcoesIcons}
                    />
                </Pressable>
            </View>
        </View>
    );
};