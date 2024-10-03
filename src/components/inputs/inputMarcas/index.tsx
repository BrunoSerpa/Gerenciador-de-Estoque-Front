import { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { styleDefault } from "../style";
import { theme } from "../../../styles";
import { listarMarcas } from "../../../services";
import { Marca } from "../../../interface/Marca";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
    marca: string | number;
    set: (marca: string | number) => void;
    refresh: number;
}


export default function InputMarca(inputMarca: Props) {
    const novaMarcaRef = useRef<TextInput>(null);
    const [marcaProcurada, setMarcaProcurada] = useState('');
    const [marcasExistentes, setMarcasExistentes] = useState<Marca[]>([]);

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
            removerAcentos(marca.nome).toUpperCase().includes(removerAcentos(marcaProcurada).toUpperCase())
        );

        if (primeiraMarca) {
            inputMarca.set(primeiraMarca.id);
        }

        setMarcaProcurada('');
    };

    const novaMarca = () => {
        if (marcaProcurada.trim() === '') return;
        const marcaExiste = marcasExistentes.find(marca => { marca.nome === marcaProcurada })
        if (!marcaExiste) {
            inputMarca.set(marcaProcurada);
        } else {
            inputMarca.set(marcaExiste.id)
        }
        setMarcaProcurada('');
    }

    const fetchMarcas = async () => {
        try {
            const response = await listarMarcas();

            if (!response || !response.data) {
                throw new Error("Resposta da API não é válida.");
            }

            if (response.data.rows) {
                const marcasAjustados = response.data.rows.map((marca: any) => ({
                    id: marca.id,
                    nome: marca.nome,
                }));

                setMarcasExistentes(marcasAjustados);
            } else {
                throw new Error("Formato de resposta da API inesperado.");
            }
        } catch (err) {
            console.error("Erro ao buscar marcas:", err);
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log("Erro desconhecido.");
            }
        }
    };

    
    useEffect(() => {
        fetchMarcas();
    }, [inputMarca.refresh]);
    
    useFocusEffect(
        useCallback(() => {
            fetchMarcas();
        }, [])
    );

    const getNomeMarcaById = (id: number) => {
        const marca = marcasExistentes.find(marca => marca.id === id);
        return marca ? marca.nome : '';
    };

    return (
        <View style={styleDefault.viewPrincipal}>
            <View style={styleDefault.viewinputTitle}>
                <Text style={styleDefault.inputTitle}>Marca</Text>
            </View>

            {inputMarca.marca !== '' ?
                <View style={styleDefault.viewTextSelected}>
                    <Text style={styleDefault.selectText}>
                        {typeof inputMarca.marca === 'number' ? getNomeMarcaById(inputMarca.marca) : inputMarca.marca}
                    </Text>
                    <Pressable onPress={() => inputMarca.set('')}>
                        <Text style={styleDefault.selectIconText}>X</Text>
                    </Pressable>
                </View>
                :
                <Pressable onPress={() => { setTimeout(() => novaMarcaRef.current?.focus(), 100) }} style={styleDefault.viewTextInputSelected}>
                    <TextInput
                        onChangeText={setMarcaProcurada}
                        onSubmitEditing={escolherMarca}
                        placeholder="Marca"
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
            }

            {marcaProcurada &&
                <ScrollView style={styleDefault.viewLista}>
                    {marcasExistentes.map((marca, index) =>
                        removerAcentos(marca.nome).toUpperCase().includes(removerAcentos(marcaProcurada).toUpperCase()) &&
                        <Pressable
                            onPress={() => inputMarca.set(marca.id)}
                            style={styleDefault.viewItemLista}
                            key={index}
                        >
                            {destacarPalavra(marca.nome, marcaProcurada)}
                        </Pressable>
                    )}
                    <Pressable onPress={novaMarca} style={styleDefault.pressAdicionar}>
                        <Text style={styleDefault.adicionarNomeTexto}>Adicionar Marca +</Text>
                    </Pressable>
                </ScrollView>
            }
        </View>
    );
}