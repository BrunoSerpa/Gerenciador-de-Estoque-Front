import { Text, View } from "react-native";
import { principalView } from "../../styles";

export default function ListaProduto() {
    return (
        <View style={principalView.PrincipalView}>
            <Text style={principalView.titleRoute}>Lista de Produtos</Text>
        </View>
    );
};