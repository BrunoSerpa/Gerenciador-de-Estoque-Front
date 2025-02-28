import { StyleSheet } from "react-native";
import { textoStyle, theme } from "../../styles";

const styleDefault = StyleSheet.create({
    separator: {
        backgroundColor: theme.preto1,
        height: "100%",
        width: 2,
    },

    widthNomes: {
        width: 142
    },

    widthTitulo: {
        width: 300
    },

    widthPreco: {
        width: 126
    },

    widthTotal: {
        width: 132
    },

    widthQuantidade: {
        width: 190
    },

    widthGarantia: {
        width: 156
    },

    widthData: {
        width: 150
    },


    widthId: {
        width: 85
    },

    widthValidade: {
        width: 156
    },

    widthMarca: {
        width: 132
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
        maxHeight: '75%',
    },
    viewCheckboxPrincipal: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 50,
        height: 'auto',
        justifyContent: 'space-between',
        marginHorizontal: 'auto',
        marginVertical: 10,
        width: '90%',
    },
    viewCheckbox: {
        justifyContent: 'space-between',
        display: 'flex',
        flex: 1,
        gap: 20,
    }
});

export const styleTitulo = StyleSheet.create({
    viewLinha: {
        alignItems: 'center',
        borderStyle: 'solid',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        display: 'flex',
        flexDirection: 'row',
        borderColor: theme.preto1,
    },
    textTitulo: {
        ...textoStyle.texto2,
        textAlign: 'center',
        display: 'flex',
        verticalAlign: 'top',
        fontWeight: '500',
        flexWrap: 'wrap',
        margin: 5,
    },
    viewTitulo:{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
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
        width: 'auto',
        borderColor: theme.preto1,
        borderStyle: 'solid',
        borderBottomWidth: 2,
    },
    dropdownNome: {
        display: 'none'
    },
    textItem: {
        ...textoStyle.texto1,
        margin: 5,
        textAlign: 'center',
    },
    textItemCadastro: {
        ...textoStyle.texto1,
        margin: 5,
        textAlign: 'center',
        color: theme.vermelho1
    },
    textItemVenda: {
        ...textoStyle.texto1,
        margin: 5,
        textAlign: 'center',
        color: theme.verde3
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