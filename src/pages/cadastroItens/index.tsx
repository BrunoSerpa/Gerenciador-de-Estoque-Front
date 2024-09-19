import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import ParamPages from "../../interface/ParamPages";
import { principalView } from "../../styles";

type ItensRouteProp = RouteProp<ParamPages, 'Cadastro de Itens'>;

export default function CadastroItens() {
    const route = useRoute<ItensRouteProp>()
    const { produtoId } = route.params || 0;
    return (
        <View style={principalView.PrincipalView}>
            <Text style={principalView.titleRoute}>Cadastro de Itens</Text>
            {produtoId && <Text>ID do produto {produtoId} </Text>}
        </View>
    );
};