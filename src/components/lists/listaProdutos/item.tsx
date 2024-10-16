import { View, Text, TouchableWithoutFeedback, Image, Pressable, } from "react-native";
import { useEffect, useRef, useState } from "react";
import { VisualizarProduto } from "../../../interface/Produto";
import { styleItem } from "../style";
import { Picker } from "@react-native-picker/picker";
import { excluirProduto } from "../../../services";
import { navigateTo } from "../../../hooks/useNavegation";

interface Props {
    produto: VisualizarProduto;
    setRefresh: (refresh: boolean) => void;
    setListarItens: (listarItens: {
        id: number
        nome: string
    }) => void;
}
export default function Item(item: Props) {
    const [nomeSelecionado, setNomeSelecionado] = useState({
        id: 0,
        nome: ''
    });

    const selecionarNomeRef = useRef<Picker<number> | null>(null);

    const handleNomeChange = (itemId: number) => {
        const nome = item.produto.nomes.find(n => n.id === itemId);
        if (nome) {
            setNomeSelecionado(nome);
        }
    };

    useEffect(() => {
        if (item.produto.nomes && item.produto.nomes.length > 0) {
            setNomeSelecionado(item.produto.nomes[0]);
        }
    }, [item.produto.nomes]);

    const deletarProduto = async () => {
        const excluir = await excluirProduto(item.produto.id)
        console.log(excluir);
        item.setRefresh(true);
    }


    return (
        <View style={styleItem.viewLinha}>
            <TouchableWithoutFeedback onPress={() => selecionarNomeRef.current?.focus()}>
                <Text style={[styleItem.textItem, styleItem.widthNomes]}>
                    {nomeSelecionado.nome}
                </Text>
            </TouchableWithoutFeedback>

            <Picker
                ref={selecionarNomeRef}
                selectedValue={nomeSelecionado.id}
                onValueChange={(itemValue) => handleNomeChange(itemValue)}
                style={styleItem.dropdownNome}
            >
                {item.produto.nomes.map((nome) => (
                    <Picker.Item key={nome.id} label={nome.nome} value={nome.id} />
                ))}
            </Picker>

            <View style={styleItem.separator} />
            <Text style={[styleItem.textItem, styleItem.widthPreco]}>R{item.produto.preco}</Text>
            <View style={styleItem.separator} />
            <Text style={[styleItem.textItem, styleItem.widthQuantidade]}>{item.produto.quantidade}</Text>
            <View style={styleItem.separator} />
            <Text style={[styleItem.textItem, styleItem.widthGarantia]}>{item.produto.garantia}</Text>
            <View style={styleItem.separator} />
            <Text style={[styleItem.textItem, styleItem.widthValidade]}>{item.produto.validade ? item.produto.validade : "-"} </Text>
            <View style={styleItem.separator} />
            <Text style={[styleItem.textItem, styleItem.widthMarca]}>{item.produto.marca &&
                item.produto.marca.nome !== '' ? item.produto.marca.nome : 'Nenhuma'}</Text>
            <View style={styleItem.separator} />
            <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                <Pressable onPress={() => item.setListarItens({
                    id: item.produto.id,
                    nome: nomeSelecionado.nome
                })}>
                    <Image
                        source={require("../../../../assets/items.png")}
                        style={styleItem.funcoesIcons}
                    />
                </Pressable>
            </View>
            <View style={styleItem.separator} />
            <View style={[styleItem.widthFuncoes, styleItem.viewFuncoes]}>
                <Pressable onPress={() => navigateTo('Atualizar Produto', {produtoId: item.produto.id})}>
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
        </View>
    );
}
