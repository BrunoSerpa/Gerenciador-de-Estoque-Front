import { View, Text, TouchableWithoutFeedback, Image, Pressable, } from "react-native";
import { useEffect, useRef, useState } from "react";
import { VisualizarProduto } from "../../../interface/Produto";
import { styleItem } from "../style";
import { Picker } from "@react-native-picker/picker";
import { excluirProduto } from "../../../services";
import { navigateTo } from "../../../hooks/useNavegation";
import ICheckbox from "./interface";

interface Props {
    produto: VisualizarProduto;
    setRefresh: (refresh: boolean) => void;
    setListarItens: (listarItens: { id: number; nome: string }) => void;
    checkbox: ICheckbox;
    nomesSelecionados: {
        [idProduto: number]: string;
    };
    atualizarNomeSelecionado: (idProduto: number, nome: string) => void;
}

export default function Item(item: Props) {
    const selecionarNomeRef = useRef<Picker<number> | null>(null);

    const handleNomeChange = (itemId: number) => {
        const nome = item.produto.nomes.find((n) => n.id === itemId);
        if (nome) {
            item.atualizarNomeSelecionado(item.produto.id, nome.nome);
        }
    };

    useEffect(() => {
        const nomeInicial = item.produto.nomes[0]?.nome || '';
        if (!item.nomesSelecionados[item.produto.id]) {
            item.atualizarNomeSelecionado(item.produto.id, nomeInicial);
        }
    }, [item.produto.nomes, item.nomesSelecionados]);

    const deletarProduto = async () => {
        const excluir = await excluirProduto(item.produto.id);
        console.log(excluir);
        item.setRefresh(true);
    };

    return (
        <View style={styleItem.viewLinha}>
            <View style={styleItem.separator} />
            {item.checkbox.Nomes && <>
                <TouchableWithoutFeedback
                    onPress={() => selecionarNomeRef.current?.focus()}
                >
                    <Text style={[styleItem.textItem, styleItem.widthNomes]}>
                        {item.nomesSelecionados[item.produto.id] || ''}
                    </Text>
                </TouchableWithoutFeedback>

                <Picker
                    ref={selecionarNomeRef}
                    selectedValue={item.produto.nomes.find(
                        (n) =>
                            n.nome === item.nomesSelecionados[item.produto.id]
                    )?.id}
                    onValueChange={(itemValue) => handleNomeChange(itemValue)}
                    style={styleItem.dropdownNome}
                >
                    {item.produto.nomes.map((nome) => (
                        <Picker.Item key={nome.id} label={nome.nome} value={nome.id} />
                    ))}
                </Picker>
                <View style={styleItem.separator} />
            </>}
            {item.checkbox.Preco && <>
                <Text style={[styleItem.textItem, styleItem.widthPreco]}>R{item.produto.preco}</Text>
                <View style={styleItem.separator} />
            </>}
            {item.checkbox.Quantidade && <>
                <Text style={[styleItem.textItem, styleItem.widthQuantidade]}>{item.produto.quantidade}</Text>
                <View style={styleItem.separator} />
            </>}
            {item.checkbox.Garantia && <>
                <Text style={[styleItem.textItem, styleItem.widthGarantia]}>{item.produto.garantia}</Text>
                <View style={styleItem.separator} />
            </>}
            {item.checkbox.Validade && <>
                <Text style={[styleItem.textItem, styleItem.widthValidade]}>{item.produto.validade ? item.produto.validade : "-"} </Text>
                <View style={styleItem.separator} />
            </>}

            {item.checkbox.Marca && <>
                <Text style={[styleItem.textItem, styleItem.widthMarca]}>{item.produto.marca &&
                    item.produto.marca.nome !== '' ? item.produto.marca.nome : 'Nenhuma'}</Text>
                <View style={styleItem.separator} />
            </>}
            {item.checkbox.Itens && <>
                <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                    <Pressable onPress={() => item.setListarItens({
                        id: item.produto.id,
                        nome: item.nomesSelecionados[item.produto.id]
                    })}>
                        <Image
                            source={require("../../../../assets/items.png")}
                            style={styleItem.funcoesIcons}
                        />
                    </Pressable>
                </View>
                <View style={styleItem.separator} />
            </>}
            {item.checkbox.Funcoes && <>
                <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                    <Pressable onPress={() => navigateTo('Atualizar Produto', { produtoId: item.produto.id })}>
                        <Image
                            source={require("../../../../assets/pencil.png")}
                            style={styleItem.funcoesIcons}
                        />
                    </Pressable>
                </View>
                <View style={styleItem.separator} />
                <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                    <Pressable onPress={deletarProduto}>
                        <Image
                            source={require("../../../../assets/trash.png")}
                            style={styleItem.funcoesIcons}
                        />
                    </Pressable>
                </View>
                <View style={styleItem.separator} />
            </>}
        </View>
    );
}
