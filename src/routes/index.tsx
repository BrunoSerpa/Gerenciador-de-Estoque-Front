import { createStackNavigator } from '@react-navigation/stack';
import { AtualizarCadastro, AtualizarProduto, CadastroItens, CadastroLote, CadastroProduto, HistoricoCadastro, ListaProduto } from '../pages';
import { ParamListBase } from '@react-navigation/native';

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
            <Stack.Screen
                name="Atualizar Cadastro"
                component={AtualizarCadastro}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Atualizar Produto"
                component={AtualizarProduto}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};