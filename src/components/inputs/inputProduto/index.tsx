import { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { styleDefault } from "../style";
import { theme } from "../../../styles";

interface Props {
    id_produto: number;
    set: (id_produto: number) => void;
};

interface NomesProps {
    id_produto: number;
    nomes: string[]
}

export default function InputProduto(inputProduto: Props) {
    const novaProdutoRef = useRef<TextInput>(null);

    const [produtoProcurado, setProdutoProcurado] = useState('');
    const [produtosExistentes, setProdutosExistentes] = useState<NomesProps[]>([])

    const destacarPalavra = (text: string, highlight: string) => {
        const textSemAcentos = removerAcentos(text);
        const highlightSemAcentos = removerAcentos(highlight);

        const parts = textSemAcentos.split(new RegExp(`(${highlightSemAcentos})`, 'gi'));
        return (
            <Text>
                {parts.map((part, index) =>
                    removerAcentos(part).toLowerCase() === highlightSemAcentos.toLowerCase() ? (
                        <Text key={index} style={[styleDefault.nomeItem, styleDefault.palavraDestacada]}>
                            {text.substring(
                                textSemAcentos.indexOf(part),
                                textSemAcentos.indexOf(part) + part.length
                            )}
                        </Text>
                    ) : (
                        <Text key={index} style={styleDefault.nomeItem}>{text.substring(
                            textSemAcentos.indexOf(part),
                            textSemAcentos.indexOf(part) + part.length
                        )}</Text>
                    )
                )}
            </Text>
        );
    };

    const removerAcentos = (text: string) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    };

    const escolherProduto = () => {
        if (produtoProcurado.trim() === '') return;

        const produtoProcuradoSemAcento = removerAcentos(produtoProcurado);

        const primeiroProduto = produtosExistentes.find(produto =>
            produto.nomes.some(nome =>
                removerAcentos(nome).toUpperCase().includes(produtoProcuradoSemAcento.toUpperCase())
            )
        );

        if (primeiroProduto) {
            inputProduto.set(primeiroProduto.id_produto);
            setProdutoProcurado(primeiroProduto.nomes[0]);
        } else {
            inputProduto.set(0);
        }
    };

    useEffect(() => {
        setProdutosExistentes([
            {
                id_produto: 1,
                nomes: ["Câmara 20 Kenda", "C20K", "Câmara 20 K"]

            },
            {
                id_produto: 2,
                nomes: ["Câmara 20 Shimano", "C20S", "Câmara 20 K"]
            },
            {
                id_produto: 3,
                nomes: ["Pedal de Metal Fino", "PMF"]
            },
            {
                id_produto: 4,
                nomes: ["Pedal de Metal Grosso", "PMG"]
            },
            {
                id_produto: 5,
                nomes: ["Pedal de Plástico Infantil", "Pedal aro 16 e 20", "PPAN"]
            },
        ])
        if (inputProduto.id_produto){
            
        }
    }, [])

    return (
        <View style={styleDefault.viewPrincipal}>
            <View style={styleDefault.viewinputTitle}>
                <Text style={styleDefault.inputTitle}>Produto</Text>
                <Text style={styleDefault.obrigatorio}>*</Text>
            </View>

            {inputProduto.id_produto !== 0 ? (
                <View style={styleDefault.viewTextSelected}>
                    <Text style={styleDefault.selectText}>{produtoProcurado}</Text>
                    <Pressable onPress={() => { inputProduto.set(0); setProdutoProcurado('') }}>
                        <Text style={styleDefault.selectIconText}>X</Text>
                    </Pressable>
                </View>
            ) : (
                <Pressable onPress={() => { setTimeout(() => novaProdutoRef.current?.focus(), 100) }} style={styleDefault.viewTextInputSelected}>
                    <TextInput
                        onChangeText={setProdutoProcurado}
                        onSubmitEditing={escolherProduto}
                        placeholder="Novo nome"
                        ref={novaProdutoRef}
                        style={styleDefault.inputText}
                        placeholderTextColor={theme.cinza2}
                        value={produtoProcurado}
                    />
                    <Image
                        source={require("../../../../assets/magnifying.png")}
                        style={styleDefault.inputIcons}
                    />
                </Pressable>
            )}

            {produtoProcurado && inputProduto.id_produto === 0 && (
                <ScrollView style={styleDefault.viewLista}>
                    {produtosExistentes.map((produto, index) =>
                        produto.nomes.map((nome, nomeIndex) =>
                            removerAcentos(nome).toUpperCase().includes(removerAcentos(produtoProcurado).toUpperCase()) && (

                                <Pressable
                                    onPress={() => {
                                        inputProduto.set(produto.id_produto);
                                        setProdutoProcurado(nome);
                                    }}
                                    style={styleDefault.viewItemLista}
                                    key={`${index}-${nomeIndex}`}
                                >
                                    {destacarPalavra(nome, produtoProcurado)}
                                </Pressable>
                            )
                        )
                    )}
                </ScrollView>
            )}
        </View>
    );
};  