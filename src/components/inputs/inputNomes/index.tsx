import React, { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { styleDefault } from "../style";
import { theme } from "../../../styles";

interface Props {
    nomes: string[];
    set: (nome: string[]) => void;
    enviouVazio?: boolean;
};

export default function InputNomes(inputNomes: Props) {
    const novoNomeRef = useRef<TextInput>(null);

    const [nomeSelecionado, setNomeSelecionado] = useState("");
    const [novoNome, setNovoNome] = useState("");
    const [mostrarLista, setMostrarLista] = useState(false);
    const [mostrarNovoInput, setMostrarNovoInput] = useState(false);

    useEffect(() => { setMostrarLista(mostrarNovoInput) }, [mostrarNovoInput]);
    useEffect(() => { if (inputNomes.nomes.length === 0) { setNomeSelecionado('') } }, [inputNomes.nomes]);

    const adicionarNome = () => {
        const nomeEmMaiusculo = novoNome.trim().toUpperCase();
        if (nomeEmMaiusculo !== "" && !inputNomes.nomes.includes(nomeEmMaiusculo)) {
            const novosNomes = [...inputNomes.nomes, nomeEmMaiusculo];
            inputNomes.set(novosNomes);
            setNovoNome("");
            setNomeSelecionado(nomeEmMaiusculo);
            setTimeout(() => novoNomeRef.current?.focus(), 100);
        } else if (mostrarNovoInput === false) {
            setMostrarNovoInput(true);
            setTimeout(() => novoNomeRef.current?.focus(), 100);
        } else { setMostrarNovoInput(false) }
    };

    const deletarNome = (nome: string) => {
        inputNomes.set(inputNomes.nomes.filter((n) => n !== nome));
        if (nomeSelecionado === nome) { setNomeSelecionado("");}
    };

    const selecionarNome = (nome: string) => {
        setNomeSelecionado(nome);
        setMostrarLista(false);
    };

    useEffect(() => {
        if (inputNomes.nomes.length > 0) {
            setNomeSelecionado(inputNomes.nomes[0]);
        } else {
            setNomeSelecionado('');
        }
    }, [inputNomes.nomes]);

    return (
        <View style={styleDefault.viewPrincipal}>
            <View style={styleDefault.viewInputTitle}>
                <Text style={styleDefault.inputTitle}>Nome</Text>
                <Text style={styleDefault.obrigatorio}>*</Text>
            </View>

            <Pressable onPress={() => { setMostrarLista(!mostrarLista); setMostrarNovoInput(false) }} style={styleDefault.viewTextSelected}>
                <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={styleDefault.selectText}
                >
                    {nomeSelecionado || "Nome"}
                </Text>
                {mostrarLista ? 
                    <Text style={styleDefault.selectIconText}>▼</Text> :
                    <Pressable onPress={(e) => { e.stopPropagation(); adicionarNome(); }}>
                        <Text style={styleDefault.selectIconText}>+</Text>
                    </Pressable>
                }
            </Pressable>

            {mostrarLista && (
                <ScrollView style={styleDefault.viewLista}>
                    {inputNomes.nomes.map((nome, index) => (
                        <>
                            {index !== 0 && <View style={styleDefault.divisorItemContainer} />}
                            <Pressable
                                onPress={() => selecionarNome(nome)}
                                style={styleDefault.viewItemLista}
                                key={index}
                            >
                                <Text style={styleDefault.nomeItem}>{nome}</Text>
                                <Pressable onPress={(e) => { e.stopPropagation(); deletarNome(nome); }}>
                                    <Image
                                        source={require("../../../../assets/trash.png")}
                                        style={styleDefault.inputIcons}
                                    />
                                </Pressable>
                            </Pressable>
                        </>
                    ))}
                    <View style={styleDefault.adicionarNomeContainer}>
                        {mostrarNovoInput ?
                            <View style={styleDefault.viewInput}>
                                <TextInput
                                    onChangeText={setNovoNome}
                                    onSubmitEditing={adicionarNome}
                                    placeholder="Novo nome"
                                    ref={novoNomeRef}
                                    style={styleDefault.inputText}
                                    placeholderTextColor={theme.cinza2}
                                    value={novoNome}
                                />
                            </View>
                            :
                            <Pressable
                                onPress={adicionarNome}
                                style={styleDefault.pressAdicionar}
                            >
                                <Text style={styleDefault.adicionarNomeTexto}>Adicionar Nome +</Text>
                            </Pressable>
                        }
                    </View>
                </ScrollView>
            )}
        </View>
    );
};
