import { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { styleDefault } from "../style";
import { theme } from "../../../styles";

interface Props {
    marca: string;
    set: (marca: string) => void;
};

export default function InputMarca(inputMarca: Props) {
    const novaMarcaRef = useRef<TextInput>(null);

    const [marcaProcurada, setMarcaProcurada] = useState('');
    const [marcasExistentes, setMarcasExistentes] = useState<string[]>([]);

    const removerAcentos = (text: string) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };

    const destacarPalavra = (text: string, highlight: string) => {
        const textSemAcentos = removerAcentos(text);
        const highlightSemAcentos = removerAcentos(highlight);

        const parts = textSemAcentos.split(new RegExp(`(${highlightSemAcentos})`, 'gi'));
        let startIndex = 0;

        return (
            <Text>
                {parts.map((part, index) => {
                    const originalPart = text.substring(startIndex, startIndex + part.length);
                    startIndex += part.length;

                    return removerAcentos(part).toLowerCase() === highlightSemAcentos.toLowerCase() ? (
                        <Text key={index} style={[styleDefault.nomeItem, styleDefault.palavraDestacada]}>
                            {originalPart}
                        </Text>
                    ) : (
                        <Text key={index} style={styleDefault.nomeItem}>
                            {originalPart}
                        </Text>
                    );
                })}
            </Text>
        );
    };

    const escolherMarca = () => {
        if (marcaProcurada.trim() === '') return;

        const primeiraMarca = marcasExistentes.find(marca =>
            removerAcentos(marca).toUpperCase().includes(removerAcentos(marcaProcurada).toUpperCase())
        );

        if (primeiraMarca) {
            inputMarca.set(primeiraMarca);
        } else {
            inputMarca.set(marcaProcurada);
        }

        setMarcaProcurada('');
    };

    useEffect(() => {
        setMarcasExistentes([
            "Shimano",
            "Caloi",
            "Kenda",
            "Sense",
            "GTS",
            "Audax",
            "KSW"
        ]);
    }, []);

    return (
        <View style={styleDefault.viewPrincipal}>
            <View style={styleDefault.viewinputTitle}>
                <Text style={styleDefault.inputTitle}>Marca</Text>
            </View>

            {inputMarca.marca && inputMarca.marca.trim() !== '' ? (
                <View style={styleDefault.viewTextSelected}>
                    <Text style={styleDefault.selectText}> {inputMarca.marca} </Text>
                    <Pressable onPress={() => inputMarca.set('')}>
                        <Text style={styleDefault.selectIconText}>X</Text>
                    </Pressable>
                </View>
            ) : (
                <Pressable onPress={() => { setTimeout(() => novaMarcaRef.current?.focus(), 100) }} style={styleDefault.viewTextInputSelected}>
                    <TextInput
                        onChangeText={setMarcaProcurada}
                        onSubmitEditing={escolherMarca}
                        placeholder="Novo nome"
                        ref={novaMarcaRef}
                        style={styleDefault.inputText}
                        placeholderTextColor={theme.cinza2}
                        value={marcaProcurada}
                    />
                    <Image
                        source={require("../../../../assets/magnifying.png")}
                        style={styleDefault.inputIcons}
                    />
                </Pressable>
            )}

            {marcaProcurada && !inputMarca.marca && (
                <ScrollView style={styleDefault.viewLista}>
                    {marcasExistentes.map((marca, index) =>
                        removerAcentos(marca).toUpperCase().includes(removerAcentos(marcaProcurada).toUpperCase()) && (
                            <Pressable
                                onPress={() => inputMarca.set(marca)}
                                style={styleDefault.viewItemLista}
                                key={index}
                            >
                                {destacarPalavra(marca, marcaProcurada)}
                            </Pressable>
                        )
                    )}
                    <Pressable onPress={() => inputMarca.set(marcaProcurada)}>
                        <Text style={styleDefault.adicionarNomeTexto}>Adicionar Nova Marca +</Text>
                    </Pressable>
                </ScrollView>
            )}
        </View>
    );
};
