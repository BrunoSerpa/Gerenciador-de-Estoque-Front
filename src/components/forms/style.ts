import { StyleSheet } from "react-native";
import { textoStyle, theme } from "../../styles";

export const styleForms = StyleSheet.create({
    bloco: {
        display: 'flex',
        gap: 25,
        height: 'auto',
        justifyContent: 'space-between',
        width: '48%'
    },
    botao: {
        fontSize: 30,
        paddingHorizontal: 30,
        paddingVertical: 3,
    },
    botaoAdicionar: {
        paddingHorizontal: 30,
        paddingVertical: 3,
        ...textoStyle.texto3
    },
    excluirIcon: {
        marginRight: 4,
        width: 30,
        height: 30,
    },
    textErro: {
        color: theme.vermelho1,
        textAlign: 'center',
        ...textoStyle.texto1
    },
    textSucesso: {
        color: theme.preto1,
        textAlign: 'center',
        ...textoStyle.texto1
    },
    viewAdicionar: {
        width: "90%",
        marginTop: 2
    },
    viewBotao: {
        alignItems: 'center',
        display: 'flex',
        marginTop: 50,
    },
    viewBotoes: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-evenly',
    },
    viewExcluir: {
        width: 90
    },
    viewFlex: {
        display: 'flex',
        flexDirection: 'row',
    },
    viewForms: {
        marginTop: 20,
        marginLeft: 5
    },
    viewPrincipal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
});

const constList = StyleSheet.create({
    separator: {
        backgroundColor: theme.preto1,
        height: "100%",
        width: 2.5,
    },
    widthProduto: {
        flex: 1,
    },
    widhtPreco: {
        width: '25%',
    },
    widthQuantidade: {
        width: '25%',
    },
})

export const styleItens = StyleSheet.create({
    viewLinha: {
        borderTopWidth: 0,
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        width: '92.5%',
    },
    ...constList
})

export const styleTitulo = StyleSheet.create({
    viewTitulo: {
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        width: '92.5%',
    },
    texts: {
        margin: 'auto',
        textAlign: 'center',
        fontWeight: '500',
        ...textoStyle.texto3
    },
    ...constList
})