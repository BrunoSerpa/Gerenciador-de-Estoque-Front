import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Button, InputDataCheckout, InputDefault, BlocoFrete } from "../../inputs";
import { theme } from "../../../styles";
import { styleForms } from "../style";
import { atualizarCadastro, excluirCadastro, listarCadastro } from "../../../services";
import ItemLote from "./item";
import TítuloLote from "./titulo";
import { navigateTo } from "../../../hooks/useNavegation";

interface Props {
    idCadastro: number
}

interface PropsProduto {
    idProduto: number;
    preco: string;
    quantidade: string;
}

export default function FormsAtualizarCadastro({ idCadastro }: Readonly<Props>) {
    const [titulo, setTitulo] = useState('');
    const [dataCadastro, setDataCadastro] = useState(new Date());
    const [produtos, setProdutos] = useState<PropsProduto[]>([]);
    const [frete, setFrete] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    useEffect(() => {
        listar();
    }, [idCadastro]);

    useEffect(() => {
        if (erro === 'Cadastro atualizado com sucesso') {
            setSucesso(erro);
            setErro('');
        }
    }, [erro]);

    const listar = async () => {
        const resposta = await listarCadastro(idCadastro);
        const cadastro = resposta.data.rows[0];
        setTitulo(cadastro.titulo);
        setDataCadastro(new Date(cadastro.data_cadastro));
        setFrete(cadastro.frete);
        const produtos: PropsProduto[] = cadastro.itens.map((item: {
            id_produto: number;
            preco: string;
            quantidade: string;
        }) => ({
            idProduto: item.id_produto,
            preco: item.preco,
            quantidade: item.quantidade
        }));
        setProdutos(produtos);
    };

    const deletarCadastro = async () => {
        await excluirCadastro(idCadastro);
        navigateTo('Histórico de Cadastro');
    };

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

    const validarProdutos = () => {
        let valido = true;
        produtos.forEach((produto, index) => {
            if (produto.idProduto === 0) {
                setErro(prev => prev + `Escolha um produto na linha ${index + 1}; `);
                valido = false;
            }
            if (produto.preco === '') {
                setErro(prev => prev + `Insira um preço para o produto da linha ${index + 1}; `);
                valido = false;
            }
            if (produto.quantidade === '' || produto.quantidade === '0') {
                setErro(prev => prev + `Insira uma quantidade maior que 0 para o produto da linha ${index + 1}; `);
                valido = false;
            }
        });
        return valido;
    };

    const atualizar = async () => {
        setErro('');
        setSucesso('');

        if (!dataCadastro) {
            setErro('Insira uma data de cadastro; ');
            return;
        }

        if (!validarProdutos()) return;

        const itens = produtos.flatMap(produto =>
            Array(Number(produto.quantidade)).fill({
                id_produto: produto.idProduto,
                preco: Number(produto.preco.replace(',', '.'))
            })
        );

        const atualiza = {
            data_cadastro: dataCadastro,
            frete: frete ? Number(frete.replace(',', '.')) : 0,
            titulo: titulo,
            itens: itens
        };

        const resposta = await atualizarCadastro(atualiza, idCadastro);
        setErro(resposta.msg);
    };

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
                        set={setDataCadastro}
                        data={dataCadastro}
                        title="Data Cadastro"
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
                <BlocoFrete
                    setFrete={setFrete}
                    frete={frete}
                />
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
                        onPress={deletarCadastro}
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