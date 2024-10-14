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
    viewAdicionar: {
        width: "90%",
        marginTop: 2
    },
    botaoAdicionar: {
        paddingHorizontal: 30,
        paddingVertical: 3,
        ...textoStyle.texto3
    },
    viewBotao: {
        alignItems: 'center',
        display: 'flex',
        marginTop: 50,
    },
    viewPrincipal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    viewFlex: {
        display: 'flex',
        flexDirection: 'row',
    },
    viewForms: {
        marginTop: 20,
        marginLeft: 10
    },
    viewExcluir: {
        width: 90
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
    }
});

const constList = StyleSheet.create({
    widthProduto: {
        flex: 1,
    },
    widhtPreco: {
        width: '28%',
    },
    widthQuantidade: {
        width: '28%',
    },
    separator: {
        backgroundColor: theme.preto1,
        height: "100%",
        width: 2.5,
    },
})

export const styleItens = StyleSheet.create({
    viewLinha: {
        borderTopWidth: 0,
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
    },
    ...constList
})

export const styleTitulo = StyleSheet.create({
    viewTitulo: {
        borderWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
    },
    texts: {
        margin:'auto',
        textAlign: 'center',
        fontWeight: '500',
        ...textoStyle.texto3
    },
    ...constList
})