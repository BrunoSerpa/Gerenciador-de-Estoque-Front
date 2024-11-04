import { useRef } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

import { styleDefault } from "../style";
import { theme } from "../../../styles";

interface Props {
    nome: string;
    set: (nome: string) => void;
    title: string;
    placeholder: string;
};


export default function InputPesquisa(inputPesquisa: Props) {
    const novaProdutoRef = useRef<TextInput>(null);

    return (
        <View style={styleDefault.viewPrincipal}>
            <View style={styleDefault.viewInputTitle}>
                <Text style={styleDefault.inputTitle}>{inputPesquisa.title}</Text>
            </View>

            <Pressable onPress={() => { setTimeout(() => novaProdutoRef.current?.focus(), 100) }} style={styleDefault.viewTextInputSelected}>
                <TextInput
                    onChangeText={inputPesquisa.set}
                    placeholder={inputPesquisa.placeholder}
                    ref={novaProdutoRef}
                    style={styleDefault.inputText}
                    placeholderTextColor={theme.cinza2}
                    value={inputPesquisa.nome}
                />
                <Image
                    source={require("../../../../assets/magnifying.png")}
                    style={styleDefault.inputIcons}
                />
            </Pressable>
        </View>
    );
};