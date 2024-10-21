import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Button, InputDataCheckout, InputDefault } from "../../inputs";
import { theme } from "../../../styles";
import { styleForms } from "../style";
import { atualizarVenda, excluirVenda, listarVenda } from "../../../services";
import ItemLote from "./item";
import TítuloLote from "./titulo";
import { navigateTo } from "../../../hooks/useNavegation";

interface Props {
    idVenda: number
}

interface PropsProduto {
    idProduto: number;
    preco: string;
    quantidade: string;
}

export default function FormsAtualizarVenda(formsAtualizarVenda: Props) {
    const [titulo, setTitulo] = useState('');
    const [dataVenda, setDataVenda] = useState(new Date());
    const [produtos, setProdutos] = useState<PropsProduto[]>([]);
    const [frete, setFrete] = useState('');

    const listar = async () => {
        const resposta = await listarVenda(formsAtualizarVenda.idVenda);
        console.log(resposta)
        const venda = resposta.data.rows[0];
        setTitulo(venda.titulo);
        setDataVenda(new Date(venda.data_venda));
        setFrete(venda.frete);
        const produtos: PropsProduto[] = venda.itens.map((item: {
            id_produto: number;
            preco_venda: string;
            quantidade: string;
        }) => {
            return {
                idProduto: item.id_produto,
                preco: item.preco_venda,
                quantidade: item.quantidade
            };
        });
        setProdutos(produtos);
        console.log(produtos);
    };

    const deletarVenda = async () => {
        const excluir = await excluirVenda(formsAtualizarVenda.idVenda)
        console.log(excluir);
        navigateTo('Histórico de Cadastro');
    };

    useEffect(() => {
        listar();
    }, [formsAtualizarVenda.idVenda]);

    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const setPreco = (index: number, preco: string) => {
        setProdutos((prevProdutos) => {
            const updatedProdutos = [...prevProdutos];
            updatedProdutos[index].preco = preco;
            return updatedProdutos;
        });
    };

    const setIdProduto = (index: number, idProduto: number) => {
        setProdutos((prevProdutos) => {
            const updatedProdutos = [...prevProdutos];
            updatedProdutos[index].idProduto = idProduto;
            return updatedProdutos;
        });
    };

    const setQuantidade = (index: number, quantidade: string) => {
        setProdutos((prevProdutos) => {
            const updatedProdutos = [...prevProdutos];
            updatedProdutos[index].quantidade = quantidade;
            return updatedProdutos;
        });
    };

    const adicionarProduto = () => {
        setProdutos((prevProdutos) => [
            ...prevProdutos,
            {
                idProduto: 0,
                preco: '',
                quantidade: '1'
            },
        ]);
    };

    const removerProduto = (index: number) => {
        setProdutos((prevProdutos) => prevProdutos.filter((_, i) => i !== index));
    };

    const atualizar = async () => {
        setErro('');
        setSucesso('');
        let atualizar = true;
        for (let index = 0; index < produtos.length; index++) {
            const produto = produtos[index];
            if (produto.idProduto === 0) {
                setErro(prev => prev + `Escolha um produto na linha ${index + 1}; `);
                atualizar = false;
            };

            if (produto.preco === '') {
                setErro(prev => prev + `Insira um preço para o produto da linha ${index + 1}; `);
                atualizar = false;
            };

            if (produto.quantidade === '' || produto.quantidade === '0') {
                setErro(prev => prev + `Insira uma quantidade maior que 0 para o produto da linha ${index + 1}; `);
                atualizar = false;
            };
        };

        if (!dataVenda) {
            setErro(prev => prev + 'Insira uma data de venda; ');
            atualizar = false;
        };


        if (atualizar === true) {
            const itens = []
            if (produtos) {
                for (let index = 0; index < produtos.length; index++) {
                    const produto = produtos[index];
                    const item = {
                        id_produto: produto.idProduto,
                        preco: Number(produto.preco.replace(',', '.'))
                    }
                    for (var i = 0; i < Number(produto.quantidade); i++) {
                        itens.push(item)
                    };
                };
            };

            const atualiza = {
                data_venda: dataVenda,
                frete: frete ? Number(frete.replace(',', '.')) : 0,
                titulo: titulo,
                itens: itens
            };

            console.log(atualiza)
            const resposta = await atualizarVenda(atualiza, formsAtualizarVenda.idVenda);
            console.log(resposta);
            setErro(resposta.msg);
        };
    };

    useEffect(() => {
        if (erro == 'Venda atualizado com sucesso') {
            setSucesso(erro)
            setErro('')
        }
    }, [erro])

    return (
        <View>
            <View style={styleForms.viewPrincipal}>
                <View style={styleForms.bloco}>
                    <InputDefault
                        placeholder="Título"
                        set={setTitulo}
                        text={titulo}
                        title="Título"
                    />
                </View>
                <View style={styleForms.bloco}>
                    <InputDataCheckout
                        set={setDataVenda}
                        data={dataVenda}
                        title="Data Venda"
                    />
                </View>
            </View>
            <View style={styleForms.viewForms}>
                <TítuloLote />
                <View>
                    {produtos.map((produto, index) => (
                        <View key={index} style={styleForms.viewFlex}>
                            <ItemLote
                                produto={produto}
                                index={index}
                                setIdProduto={setIdProduto}
                                setPreco={setPreco}
                                setQuantidade={setQuantidade}
                            />
                            {index !== 0 &&
                                <Pressable onPress={() => removerProduto(index)} style={styleForms.viewExcluir}>
                                    <Image
                                        source={require("../../../../assets/trash.png")}
                                        style={styleForms.excluirIcon}
                                    />
                                </Pressable>
                            }
                        </View>
                    ))}
                </View>
                <View style={styleForms.viewAdicionar}>
                    <Button
                        background={theme.verde1}
                        backgroundPress={theme.verde2}
                        color={theme.branco2}
                        onPress={adicionarProduto}
                        style={styleForms.botaoAdicionar}
                        title="Adicionar Produto"
                        width={'100%'}
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
                        onPress={deletarVenda}
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