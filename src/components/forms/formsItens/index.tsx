import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button, InputDataCheckout, InputDefault, InputProduto } from "../../inputs";
import { theme } from "../../../styles";
import { styleForms } from "../style";
import { cadastrarCadastro } from "../../../services";

interface Props {
    idProduto?: number;
}
export default function FormsItens(forms: Props) {
    const [titulo, setTitulo] = useState('');
    const [idProduto, setIdProduto] = useState<number>(0);
    const [frete, setFrete] = useState('');
    const [dataCadastro, setDataCadastro] = useState(new Date());
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')

    const cadastrar = async () => {
        setErro('');
        setSucesso('')
        let cadastrar = true;

        if (idProduto === 0) {
            setErro('Insira um produto; ');
            cadastrar = false;
        }

        if (!dataCadastro) {
            setErro(prev => prev + 'Insira uma data de cadastro; ');
            cadastrar = false;
        }

        if (preco === '') {
            setErro(prev => prev + 'Insira um preço; ');
            cadastrar = false;
        }

        if (quantidade === '') {
            setErro(prev => prev + 'Insira uma quantidade; ');
            cadastrar = false;
        }

        if (cadastrar === true) {
            const item = {
                id_produto: idProduto,
                preco: Number(preco.replace(',', '.'))
            }
            const itens = []
            for (var i = 0; i < Number(quantidade); i++) {
                itens.push(item)
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
            setIdProduto(0);
            setFrete('');
            setPreco('');
            setQuantidade('');
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
                    <InputProduto
                        id_nome={idProduto}
                        set={setIdProduto}
                        idInicial={forms.idProduto || 0}
                    />
                    <InputDefault
                        esquerda
                        keyboardType="number-pad"
                        marcacao="R$"
                        placeholder="0,00"
                        set={setFrete}
                        text={frete}
                        title="Frete"
                    />
                </View>
                <View style={styleForms.bloco}>
                    <InputDataCheckout
                        set={setDataCadastro}
                        data={dataCadastro}
                        title="Data Cadastro"
                    />
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
                    <InputDefault
                        keyboardType="numeric"
                        obrigatorio
                        placeholder="0"
                        set={setQuantidade}
                        text={quantidade}
                        title="Quantidade"
                    />
                </View>
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