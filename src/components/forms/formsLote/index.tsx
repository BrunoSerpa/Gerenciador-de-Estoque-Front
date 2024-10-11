import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button, InputDataCheckout, InputDefault, InputProduto } from "../../inputs";
import { theme } from "../../../styles";
import { styleForms } from "../style";
import { cadastrarCadastro } from "../../../services";

interface PropsProduto {
    idProduto: number;
    preco: string;
    quantidade: string;
}

export default function FormsLote() {
    const [titulo, setTitulo] = useState('');
    const [dataCadastro, setDataCadastro] = useState(new Date());
    const [produtos, setProdutos] = useState<PropsProduto[]>([{
        idProduto: 0,
        preco: '',
        quantidade: '1'
    }])
    const [frete, setFrete] = useState('');

    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')

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
    const cadastrar = async () => {
        setErro('');
        setSucesso('')
        let cadastrar = true;


        for (let index = 0; index < produtos.length; index++) {
            const produto = produtos[index];
            if (produto.idProduto === 0) {
                setErro(prev => prev + `Escolha um produto na linha ${index + 1}; `);
                cadastrar = false;
            }
            if (produto.preco === '') {
                setErro(prev => prev + `Insira um preço para o produto da linha ${index + 1}; `);
                cadastrar = false;
            }

            if (produto.quantidade === '' || produto.quantidade === '0') {
                setErro(prev => prev + `Insira uma quantidade maior que 0 para o produto da linha ${index + 1}; `);
                cadastrar = false;
            }
        }

        if (!dataCadastro) {
            setErro(prev => prev + 'Insira uma data de cadastro; ');
            cadastrar = false;
        }


        if (cadastrar === true) {
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
                    }

                }
            }

            const cadastro = {
                data_cadastro: dataCadastro,
                frete: Number(frete.replace(',', '.')),
                titulo: titulo,
                itens: itens
            }

            const resposta = await cadastrarCadastro(cadastro);
            console.log(resposta);
            setErro(resposta.msg)
        }
    };

    useEffect(() => {
        if (erro == 'Cadastro cadastrada com sucesso') {
            setSucesso(erro)
            setErro('')

            setTitulo('');
            setProdutos([])
            setFrete('');
            setDataCadastro(new Date());
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
                        set={setDataCadastro}
                        data={dataCadastro}
                        title="Data Cadastro"
                    />
                </View>
            </View>
            <View>
                <View>
                    {produtos.map((produto, index) => (
                        <View key={index}>
                            <InputProduto
                                id_nome={produto.idProduto}
                                set={(id) => setIdProduto(index, id)}
                                idInicial={0}
                            />
                            <InputDefault
                                esquerda
                                keyboardType="number-pad"
                                marcacao="R$"
                                obrigatorio
                                placeholder="0,00"
                                set={(preco) => setPreco(index, preco)}
                                text={produto.preco}
                                title="Preço"
                            />
                            <InputDefault
                                keyboardType="numeric"
                                obrigatorio
                                placeholder="0"
                                set={(quantidade) => setQuantidade(index, quantidade)}
                                text={produto.quantidade}
                                title="Quantidade"
                            />
                        </View>
                    ))}
                </View>
                <Button
                    background={theme.verde1}
                    backgroundPress={theme.verde2}
                    color={theme.branco2}
                    onPress={adicionarProduto}
                    style={styleForms.botao}
                    title="Adicionar Produto"
                    width={'100%'}
                />
            </View>
            <View style={styleForms.viewBotao}>
                <Button
                    background={theme.verde1}
                    backgroundPress={theme.verde2}
                    color={theme.branco2}
                    onPress={cadastrar}
                    style={styleForms.botao}
                    title="Cadastrar"
                    width={'50%'}
                />
            </View>
            <Text style={styleForms.textErro}>{erro}</Text>
            <Text style={styleForms.textSucesso}>{sucesso}</Text>
        </View>
    );
};