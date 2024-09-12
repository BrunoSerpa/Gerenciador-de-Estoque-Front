import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { navigateTo } from '../../hooks/useNavegation';

function Menu() {
    return (
        <View>
            <TouchableOpacity onPress={() => navigateTo('Cadastro de Produto')}>
                <Text>Cadastro de Produto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('Cadastro de Itens')}>
                <Text>Cadastro de Itens</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('Histórico de Cadastro')}>
                <Text>Histórico de Cadastros</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('Lista de Produtos')}>
                <Text>Lista de Produtos</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Menu;
