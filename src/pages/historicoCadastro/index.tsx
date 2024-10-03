import { Text, View } from "react-native";
import { principalView } from "../../styles";
import { ListaCadastros } from "../../components/lists";

export default function HistoricoCadastro() {
    return (
        <View style={principalView.PrincipalView}>
            <Text style={principalView.titleRoute}>Histórico de Cadastro</Text>
            <ListaCadastros />
        </View>
    );
};