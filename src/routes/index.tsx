import { createStackNavigator } from '@react-navigation/stack';
import { CadastroItens, CadastroProduto, HistoricoCadastro, ListaProduto } from '../pages';
import { ParamListBase } from '@react-navigation/native';

const Stack = createStackNavigator<ParamListBase>();

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName="Histórico de Cadastro">
            <Stack.Screen name="Histórico de Cadastro" component={HistoricoCadastro} />
            <Stack.Screen name="Lista de Produtos" component={ListaProduto} />
            <Stack.Screen name="Cadastro de Produto" component={CadastroProduto} />
            <Stack.Screen name="Cadastro de Itens" component={CadastroItens} />
        </Stack.Navigator>
    );
};