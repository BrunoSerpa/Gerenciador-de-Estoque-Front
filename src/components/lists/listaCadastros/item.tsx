import { View, Text, Image, Pressable } from "react-native";
import { styleItem } from "../style";
import { excluirCadastro } from "../../../services";
import { VisualizarCadastro } from "../../../interface/Cadastro";
import { navigateTo } from "../../../hooks/useNavegation";

interface Props {
    cadastro: VisualizarCadastro;
    setRefresh: (refresh: boolean) => void;
}
export default function Item(item: Props) {
    const deletarCadastro = async () => {
        const excluir = await excluirCadastro(item.cadastro.id)
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
            <Text style={[styleItem.textItem, styleItem.widthTitulo]}>{item.cadastro.titulo !== '' ? item.cadastro.titulo : `Cadastro ${item.cadastro.id}`}</Text>
            <View style={styleItem.separator} />
            <Text style={[styleItem.textItem, styleItem.widthDataCadastro]}>{formatarData(item.cadastro.data_cadastro)}</Text>
            <View style={styleItem.separator} />
            <Text style={[styleItem.textItem, styleItem.widthTotal]}>R${item.cadastro.total} </Text>
            <View style={styleItem.separator} />
            <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                <Pressable onPress={() => navigateTo('Atualizar Cadastro', {cadastroId: item.cadastro.id})}>
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
