import { View, Text, Image, Pressable } from "react-native";
import { styleItem } from "../style";
import { excluirCadastro } from "../../../services";
import { VisualizarCadastro } from "../../../interface/Cadastro";
import { navigateTo } from "../../../hooks/useNavegation";

interface Props {
    cadastro: VisualizarCadastro;
    setRefresh: (refresh: boolean) => void;
}
export default function ItemCadastro(itemCadastro: Props) {
    const deletarCadastro = async () => {
        const excluir = await excluirCadastro(itemCadastro.cadastro.id)
        console.log(excluir);
        itemCadastro.setRefresh(true);
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
            <Text style={[styleItem.textItemCadastro, styleItem.widthTitulo]}>{itemCadastro.cadastro.titulo !== '' ? itemCadastro.cadastro.titulo : `Cadastro ${itemCadastro.cadastro.id}`}</Text>
            <View style={styleItem.separator} />
            <Text style={[styleItem.textItemCadastro, styleItem.widthData]}>{formatarData(itemCadastro.cadastro.data_cadastro)}</Text>
            <View style={styleItem.separator} />
            <Text style={[styleItem.textItemCadastro, styleItem.widthTotal]}>- R${itemCadastro.cadastro.total} </Text>
            <View style={styleItem.separator} />
            <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                <Pressable onPress={() => navigateTo('Atualizar Cadastro', {cadastroId: itemCadastro.cadastro.id})}>
                    <Image
                        source={require("../../../../assets/pencil.png")}
                        style={styleItem.funcoesIcons}
                    />
                </Pressable>
            </View>
            <View style={styleItem.separator} />
            <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                <Pressable onPress={deletarCadastro}>
                    <Image
                        source={require("../../../../assets/trash.png")}
                        style={styleItem.funcoesIcons}
                    />
                </Pressable>
            </View>
        </View>
    );
}
