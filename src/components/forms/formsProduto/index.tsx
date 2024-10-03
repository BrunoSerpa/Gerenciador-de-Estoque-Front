import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, InputDefault, InputMarca, InputNomes } from "../../inputs";
import { theme } from "../../../styles";
import { styleForms } from "../style";
import { cadastrarProduto } from "../../../services";

export default function FormsProduto() {
    const [nomes, setNomes] = useState<string[]>([]);
    const [preco, setPreco] = useState('');
    const [marca, setMarca] = useState<string | number>('');
    const [garantia, setGarantia] = useState('');
    const [validade, setValidade] = useState('');

    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [refresh, setRefresh] = useState(1)

    const cadastrar = async () => {
        setErro('');
        let cadastrar = true;

        if (nomes.length === 0) {
            setErro('Insira pelo menos um nome; ');
            cadastrar = false;
        }
        if (preco === '') {
            setErro(prev => prev + 'Insira um preço; ');
            cadastrar = false;
        }
        if (garantia === '') {
            setErro(prev => prev + 'Insira uma garantia; ');
            cadastrar = false;
        }

        if (cadastrar === true) {
            const produto = {
                nomes: nomes,
                garantia: Number(garantia),
                preco: Number(preco.replace(',', '.')),
                marca: marca,
                validade: Number(validade)
            }

            const resposta = await cadastrarProduto(produto);

            console.log(resposta);
            setErro(resposta.msg)
            setRefresh(refresh+1)
        }
    };

    useEffect(() => {
        if (erro == 'Produto cadastrado com sucesso') {
            setSucesso(erro)
            setErro('')

            setNomes([]);
            setPreco('');
            setMarca('');
            setGarantia('');
            setValidade('');
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
                    <InputMarca marca={marca} set={setMarca} refresh={refresh}/>
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