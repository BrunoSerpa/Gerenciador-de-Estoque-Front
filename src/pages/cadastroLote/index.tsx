import { Text, View } from "react-native";
import { principalView } from "../../styles";
import FormsLote from "../../components/forms/formsLote";

export default function CadastroLote() {
    return (
        <View style={principalView.PrincipalView}>
            <Text style={principalView.titleRoute}>Cadastro em Lote</Text>
            <FormsLote />
        </View>
    );
};