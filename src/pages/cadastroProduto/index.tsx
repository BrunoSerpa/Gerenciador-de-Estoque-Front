import { Text, View } from "react-native";
import { principalView } from "../../styles";
import FormsProduto from "../../components/forms/formsProduto";

export default function CadastroProduto() {
    return (
        <View style={principalView.PrincipalView}>
            <Text style={principalView.titleRoute}>Cadastro de Produto</Text>
            <FormsProduto />
        </View>
    );
};