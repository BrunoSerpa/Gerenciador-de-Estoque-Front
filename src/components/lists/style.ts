import { StyleSheet } from "react-native";
import { textoStyle, theme } from "../../styles";

const styleDefault = StyleSheet.create({
    separator: {
        backgroundColor: theme.preto1,
        height: "100%",
        marginHorizontal: 10,
        width: 2,
    },

    widthNomes: {
        width: 250
    },

    widthTitulo: {
        width: 300
    },
    

    widthPreco: {
        width: 100
    },

    widthTotal: {
        width: 110
    },

    widthQuantidade: {
        width: 150
    },

    widthGarantia: {
        width: 100
    },

    widthDataCadastro: {
        width: 110
    },


    widthId: {
        width: 50
    },

    widthValidade: {
        width: 100
    },

    widthMarca: {
        width: 300
    },

    widthFuncoes: {
        width: 90
    },
})

export const styleLista = StyleSheet.create({
    scrollView: {
        display: 'flex',
        marginTop: 10,
        marginHorizontal: 'auto',
        maxWidth: '90%',
        maxHeight: '80%',
    }
});

export const styleTitulo = StyleSheet.create({
    viewLinha: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        borderColor: theme.preto1,
        borderStyle: 'solid',
        borderWidth: 2,
    },
    textTitulo: {
        ...textoStyle.texto2,
        textAlign: 'center',
        fontWeight: 500,
        margin: 5,
    },
    ...styleDefault

});

export const styleItem = StyleSheet.create({
    viewLinha: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        height: 'auto',
        width: '100%',
        borderColor: theme.preto1,
        borderStyle: 'solid',
        borderWidth: 2,
        borderTopWidth: 0
    },
    dropdownNome: {
        display: 'none'
    },
    textItem: {
        ...textoStyle.texto1,
        margin: 5,
        textAlign: 'center',
    },
    viewFuncoes: {
        alignItems: 'center',
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    funcoesIcons: {
        marginRight: 4,
        width: 30,
        height: 30,
    },
    ...styleDefault
});