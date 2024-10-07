import { createStackNavigator } from '@react-navigation/stack';
import { CadastroItens, CadastroProduto, HistoricoCadastro, ListaProduto } from '../pages';
import { ParamListBase } from '@react-navigation/native';
import CadastroLote from '../pages/cadastroLote';

const Stack = createStackNavigator<ParamListBase>();

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName="Histórico de Cadastro">
            <Stack.Screen
                name="Histórico de Cadastro"
                component={HistoricoCadastro}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Lista de Produtos"
                component={ListaProduto}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Cadastro de Produto"
                component={CadastroProduto}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Cadastro de Itens"
                component={CadastroItens}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Cadastro em Lote"
                component={CadastroLote}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};