import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import ParamPages from "../../interface/ParamPages";
import { principalView } from "../../styles";
import FormsAtualizarProduto from "../../components/forms/formsAtualizarProduto";

type ItensRouteProp = RouteProp<ParamPages, 'Atualizar Produto'>;

export default function AtualizarProduto() {
    const route = useRoute<ItensRouteProp>()
    const { produtoId } = route.params || 0;
    return (
        <View style={principalView.PrincipalView}>
            <Text style={principalView.titleRoute}>Atualizar Produto (ID: {produtoId})</Text>
            <FormsAtualizarProduto idProduto={produtoId}/>
        </View>
    );
};