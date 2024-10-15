import { useCallback, useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { styleDefault } from "../style";
import { theme } from "../../../styles";
import { Nome } from "../../../interface/Nome";
import { listarNomes } from "../../../services";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
    id_nome: number;
    set: (id_nome: number) => void;
    idInicial: number;
    inicialProduto?: boolean;
    title?: boolean
};


export default function InputProduto(inputProduto: Props) {
    const novaProdutoRef = useRef<TextInput>(null);

    const [produtoProcurado, setProdutoProcurado] = useState('');
    const [produtosExistentes, setProdutosExistentes] = useState<Nome[]>([])
    const [produtoNaoEncontrado, setProdutoNaoEncontrado] = useState(false);


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
            removerAcentos(produto.nome).toUpperCase().includes(produtoProcuradoSemAcento.toUpperCase())
        );

        if (primeiroProduto) {
            inputProduto.set(primeiroProduto.id_produto);
            setProdutoProcurado(primeiroProduto.nome);
            setProdutoNaoEncontrado(false);
        } else {
            inputProduto.set(0);
            setProdutoNaoEncontrado(true);
        }
    };

    const fetchNomes = async () => {
        try {
            const response = await listarNomes();

            if (!response || !response.data) {
                throw new Error("Resposta da API não é válida.");
            }

            if (response.data.rows) {
                const nomesAjustados = response.data.rows.map((nome: any) => ({
                    id: nome.id,
                    id_produto: nome.id_produto,
                    nome: nome.nome
                }));

                setProdutosExistentes(nomesAjustados);
            } else {
                throw new Error("Formato de resposta da API inesperado.");
            }

        } catch (err) {
            console.error("Erro ao buscar nomes:", err);
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log("Erro desconhecido.");
            }
        }
    };

    useEffect(() => {
        fetchNomes();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchNomes();
        }, [])
    );

    useEffect(() => {
        if (produtosExistentes.length > 0 && inputProduto.idInicial !== 0) {
            const procuraNome = inputProduto.inicialProduto ?? false;
            const produto = produtosExistentes.find(produto => {
                return procuraNome ?
                    produto.id_produto === inputProduto.idInicial :
                    produto.id === inputProduto.idInicial;
            });

            setProdutoProcurado(produto?.nome || '');
            inputProduto.set(produto?.id_produto || 0);
        }
    }, [produtosExistentes, inputProduto.idInicial]);

    return (
        <View style={styleDefault.viewPrincipal}>
            {(inputProduto.title ?? true) &&
                <View style={styleDefault.viewInputTitle}>
                    <Text style={styleDefault.inputTitle}>Produto</Text>
                    <Text style={styleDefault.obrigatorio}>*</Text>
                </View>
            }

            {inputProduto.id_nome !== 0 ? (
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
                        placeholder="Nome"
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

            {produtoProcurado && inputProduto.id_nome === 0 && (
                <ScrollView style={styleDefault.viewLista}>
                    {produtosExistentes.map((produto, index) =>
                        removerAcentos(produto.nome).toUpperCase().includes(removerAcentos(produtoProcurado).toUpperCase()) && (
                            <Pressable
                                onPress={() => {
                                    inputProduto.set(produto.id_produto);
                                    setProdutoProcurado(produto.nome);
                                }}
                                style={styleDefault.viewItemLista}
                                key={`${index}`}
                            >
                                {destacarPalavra(produto.nome, produtoProcurado)}
                            </Pressable>
                        )
                    )}
                    {produtoNaoEncontrado && (
                        <Text style={styleDefault.viewItemLista}>Produto não encontrado</Text>
                    )}
                </ScrollView>

            )}
        </View>
    );
};