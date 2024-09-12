import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import ParamPages from "../../interface/ParamPages";

type ItensRouteProp = RouteProp<ParamPages, 'Cadastro de Itens'>;

export default function CadastroItens() {
    const route = useRoute<ItensRouteProp>()
    const { produtoId } = route.params || 0;
    return (
        <View>
            <Text>Cadastro de Itens</Text>
            {produtoId && <Text>ID do produto {produtoId} </Text>}
        </View>
    );
};