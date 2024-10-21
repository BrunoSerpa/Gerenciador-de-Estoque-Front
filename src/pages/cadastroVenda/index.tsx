import { Text, View } from "react-native";
import { principalView } from "../../styles";
import FormsVenda from "../../components/forms/formsVenda";

export default function CadastroVenda() {
    return (
        <View style={principalView.PrincipalView}>
            <Text style={principalView.titleRoute}>Cadastro Venda</Text>
            <FormsVenda />
        </View>
    );
};