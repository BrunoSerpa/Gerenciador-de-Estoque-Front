import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import ParamPages from "../../interface/ParamPages";
import { principalView } from "../../styles";
import FormsAtualizarVenda from "../../components/forms/formsAtualizarVenda";

type ItensRouteProp = RouteProp<ParamPages, 'Atualizar Venda'>;

export default function AtualizarVenda() {
    const route = useRoute<ItensRouteProp>()
    const { vendaId } = route.params || 0;
    return (
        <View style={principalView.PrincipalView}>
            <Text style={principalView.titleRoute}>Atualizar Venda (ID: {vendaId})</Text>
            <FormsAtualizarVenda idVenda={vendaId}/>
        </View>
    );
};