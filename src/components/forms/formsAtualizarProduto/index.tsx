import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, InputDefault, InputMarca, InputNomes } from "../../inputs";
import { theme } from "../../../styles";
import { styleForms } from "../style";
import { atualizarProduto, excluirProduto, listarProduto } from "../../../services";
import { navigateTo } from "../../../hooks/useNavegation";

interface Props {
    idProduto: number
}

export default function FormsAtualizarProduto(formsAtualizarProduto: Props) {
    const [nomes, setNomes] = useState<string[]>([]);
    const [preco, setPreco] = useState('');
    const [marca, setMarca] = useState<string | number>('');
    const [garantia, setGarantia] = useState('');
    const [validade, setValidade] = useState('');

    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [refresh, setRefresh] = useState(1)

    const listar = async () => {
        const resposta = await listarProduto(formsAtualizarProduto.idProduto);
        const produto = resposta.data.rows;
        setNomes([])
        const nomesProdutos = []
        for (let index = 0; index < produto.nomes.length; index++) {
            const nome = produto.nomes[index].nome;
            nomesProdutos.push(nome)
        }
        setNomes(nomesProdutos)
        setPreco(produto.preco.replace('$', '').trim());
        setMarca(produto.marca);
        setGarantia(produto.garantia);
        setValidade(produto.validade);
    };

    const deletarProduto = async () => {
        const excluir = await excluirProduto(formsAtualizarProduto.idProduto)
        console.log(excluir);
        navigateTo('Lista de Produtos');
    };

    const atualizar = async () => {
        setErro('');
        let atualizar = true;

        if (nomes.length === 0) {
            setErro('Insira pelo menos um nome; ');
            atualizar = false;
        }
        if (preco === '') {
            setErro(prev => prev + 'Insira um preço; ');
            atualizar = false;
        }
        if (garantia === '') {
            setErro(prev => prev + 'Insira uma garantia; ');
            atualizar = false;
        }

        if (atualizar === true) {
            const produto = {
                nomes: nomes,
                garantia: Number(garantia),
                preco: Number(preco.replace(',', '.')),
                marca: marca,
                validade: Number(validade)
            }
            const resposta = await atualizarProduto(produto, formsAtualizarProduto.idProduto);
            console.log(resposta);
            setErro(resposta.msg)
            setRefresh(refresh + 1)
        }
    };

    useEffect(() => {
        listar();
    }, [formsAtualizarProduto.idProduto]);

    useEffect(() => {
        if (erro == 'Produto atualizado com sucesso') {
            setSucesso(erro)
            setErro('')
        }
    }, [erro])

    return (
        <View>
            <View style={styleForms.viewPrincipal}>
                <View style={styleForms.bloco}>
                    <InputNomes nomes={nomes} set={setNomes} />
                    <InputDefault
                        esquerda
                        keyboardType="number-pad"
                        marcacao="R$"
                        obrigatorio
                        placeholder="0,00"
                        set={setPreco}
                        text={preco}
                        title="Preço"
                    />
                </View>
                <View style={styleForms.bloco}>
                    <InputMarca marca={marca} set={setMarca} refresh={refresh} />
                    <InputDefault
                        keyboardType="numeric"
                        marcacao="dias"
                        obrigatorio
                        placeholder="0"
                        set={setGarantia}
                        text={garantia}
                        title="Garantia"
                    />
                    <InputDefault
                        keyboardType="numeric"
                        marcacao="dias"
                        placeholder="0"
                        set={setValidade}
                        text={validade}
                        title="Validade"
                    />
                </View>
            </View>
            <View style={styleForms.viewBotoes}>
                <View style={styleForms.viewBotao}>
                    <Button
                        background={theme.amarelo1}
                        color={theme.preto1}
                        onPress={atualizar}
                        style={styleForms.botao}
                        title="Atualizar"
                        width={'100%'}
                    />
                </View>
                <View style={styleForms.viewBotao}>
                    <Button
                        background={theme.vermelho1}
                        color={theme.branco2}
                        onPress={deletarProduto}
                        style={styleForms.botao}
                        title="Excluir"
                        width={'100%'}
                    />
                </View>
            </View>
            <Text style={styleForms.textErro}>{erro}</Text>
            <Text style={styleForms.textSucesso}>{sucesso}</Text>
        </View>
    );
};