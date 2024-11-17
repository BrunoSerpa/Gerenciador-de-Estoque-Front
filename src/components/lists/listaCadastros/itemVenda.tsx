import { View, Text, Image, Pressable } from "react-native";
import { styleItem } from "../style";
import { excluirVenda } from "../../../services";
import { VisualizarVenda } from "../../../interface/Venda";
import { navigateTo } from "../../../hooks/useNavegation";
import ICheckbox from "./interface";

interface Props {
    venda: VisualizarVenda;
    checkbox: ICheckbox;
    setRefresh: (refresh: boolean) => void;
}
export default function ItemVenda(itemVenda: Props) {
    const deletarVenda = async () => {
        const excluir = await excluirVenda(itemVenda.venda.id)
        console.log(excluir);
        itemVenda.setRefresh(true);
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
            <View style={styleItem.separator} />
            {itemVenda.checkbox.Título && <>
                <Text style={[styleItem.textItemVenda, styleItem.widthTitulo]}>{itemVenda.venda.titulo !== '' ? itemVenda.venda.titulo : `Venda ${itemVenda.venda.id}`}</Text>
                <View style={styleItem.separator} />
            </>}
            {itemVenda.checkbox.Data && <>
                <Text style={[styleItem.textItemVenda, styleItem.widthData]}>{formatarData(itemVenda.venda.data_venda)}</Text>
                <View style={styleItem.separator} />
            </>}
            {itemVenda.checkbox.Total && <>
                <Text style={[styleItem.textItemVenda, styleItem.widthTotal]}>+ R${itemVenda.venda.total} </Text>
                <View style={styleItem.separator} />
            </>}
            {itemVenda.checkbox.Funcoes && <>
                <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                    <Pressable onPress={() => navigateTo('Atualizar Venda', {vendaId: itemVenda.venda.id})}>
                        <Image
                            source={require("../../../../assets/pencil.png")}
                            style={styleItem.funcoesIcons}
                        />
                    </Pressable>
                </View>
                <View style={styleItem.separator} />
            </>}
            {itemVenda.checkbox.Funcoes && <>
                <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                    <Pressable onPress={deletarVenda}>
                        <Image
                            source={require("../../../../assets/trash.png")}
                            style={styleItem.funcoesIcons}
                        />
                    </Pressable>
                </View>
                <View style={styleItem.separator} />
            </>}
        </View>
    );
}
