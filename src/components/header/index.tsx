import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { navigateTo } from '../../hooks/useNavegation';
import { styleHeader } from './style';

function Menu() {
    const [showHamburguer, setShowHamburguer] = useState(true);

    const rotation = useRef(new Animated.Value(0)).current;

    const toggleHamburguer = () => {
        Animated.timing(rotation, {
            toValue: showHamburguer ? 0 : 1,
            duration: 350,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
        }).start();
        setShowHamburguer(!showHamburguer);
    };

    const rotateInterpolate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });

    const animatedStyle = {
        transform: [{ rotate: rotateInterpolate }],
    };


    return (
        <View style={styleHeader.Header}>
            <TouchableOpacity onPress={toggleHamburguer}>
                <Animated.Image
                    source={require("../../../assets/hamburguer.png")}
                    style={[styleHeader.Image, animatedStyle]}
                />
            </TouchableOpacity>
            {showHamburguer && <View style={styleHeader.ViewLinks}>
                <TouchableOpacity onPress={() => {
                    navigateTo('Cadastro de Produto');
                    toggleHamburguer();
                }}>
                    <Text style={styleHeader.Text}>Cadastro de Produto</Text>
                </TouchableOpacity>
                <View style={styleHeader.Divisor} />
                <TouchableOpacity onPress={() => {
                    navigateTo('Cadastro em Lote');
                    toggleHamburguer();
                }}>
                    <Text style={styleHeader.Text}>Cadastro em Lote</Text>
                </TouchableOpacity>
                <View style={styleHeader.Divisor} />
                <TouchableOpacity onPress={() => {
                    navigateTo('Cadastro de Itens');
                    toggleHamburguer();
                }}>
                    <Text style={styleHeader.Text}>Cadastro de Itens</Text>
                </TouchableOpacity>
                <View style={styleHeader.Divisor} />
                <TouchableOpacity onPress={() => {
                    navigateTo('Histórico de Cadastro');
                    toggleHamburguer();
                }}>
                    <Text style={styleHeader.Text}>Histórico de Cadastros</Text>
                </TouchableOpacity>
                <View style={styleHeader.Divisor} />
                <TouchableOpacity onPress={() => {
                    navigateTo('Lista de Produtos');
                    toggleHamburguer();
                }}>
                    <Text style={styleHeader.Text}>Lista de Produtos</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    )
};

export default Menu;
