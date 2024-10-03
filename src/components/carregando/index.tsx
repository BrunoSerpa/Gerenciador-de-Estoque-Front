import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { styleCarregando } from './style';

export default function Carregando() {
    const [pontos, setPontos] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setPontos(prev => {
                if (prev.length < 3) {
                    return prev + '.';
                } else {
                    return '.';
                }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styleCarregando.viewCarregando}>
            <Text style={styleCarregando.textCarregando}>
                Carregando{pontos}
            </Text>
        </View>
    );
}
