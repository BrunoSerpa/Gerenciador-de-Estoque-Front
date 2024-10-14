import { RouteProp, useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import ParamPages from "../../interface/ParamPages";
import { principalView } from "../../styles";
import FormsAtualizarCadastro from "../../components/forms/formsAtualizarCadastro";

type ItensRouteProp = RouteProp<ParamPages, 'Atualizar Cadastro'>;

export default function AtualizarCadastro() {
    const route = useRoute<ItensRouteProp>()
    const { cadastroId } = route.params || 0;
    return (
        <View style={principalView.PrincipalView}>
            <Text style={principalView.titleRoute}>Atualizar Cadastro (ID: {cadastroId})</Text>
            <FormsAtualizarCadastro idCadastro={cadastroId}/>
        </View>
    );
};