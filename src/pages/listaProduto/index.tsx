import { Text, View } from "react-native";
import { principalView } from "../../styles";
import { ListaProdutos } from "../../components/lists";

export default function ListaProduto() {
    return (
        <View style={principalView.PrincipalView}>
            <Text style={principalView.titleRoute}>Lista de Produtos</Text>
            <ListaProdutos />
        </View>
    );
};