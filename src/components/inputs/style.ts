import { StyleSheet } from "react-native";
import { textoStyle, theme } from "../../styles";

export const styleDefault = StyleSheet.create({
    adicionarNomeContainer: {
        display: 'flex',
        height: 30,
        justifyContent: 'center'
    },

    adicionarNomeTexto: {
        color: theme.branco2,
        textAlign: 'center',
        width: '100%',
        ...textoStyle.texto1
    },

    checkText: textoStyle.texto1,

    divisorItemContainer: {
        backgroundColor: theme.preto1,
        height: 1.5,
        width: '100%'
    },

    fecharIcon: {
        height: 20,
        marginHorizontal: 10,
        width: 20
    },

    nomeItem: textoStyle.texto3,

    obrigatorio: {
        color: theme.vermelho1,
        ...textoStyle.texto1
    },

    inputIcons: {
        height: 20,
        width: 20
    },

    inputTitle: textoStyle.texto2,

    inputText: {
        color: theme.cinza2,
        ...textoStyle.texto1
    },

    palavraDestacada: {
        color: theme.azul1,
        fontWeight: 'bold'
    },

    pressAdicionar: {
        backgroundColor: theme.verde1,
        height: "100%",
        width: "100%"
    },

    selectText: {
        color: theme.cinza1,
        flex: 2,
        width: '100%',
        ...textoStyle.texto1
    },

    selectIconText: {
        color: theme.preto1,
        marginTop: -4,
        width: 'auto',
        ...textoStyle.texto2
    },

    viewDataCheck: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
    },

    viewFechar: {
        alignItems: 'flex-end',
        display: 'flex',
        marginBottom: 20,
        marginTop: -31.5,
        width: '100%'
    },

    viewInput: {
        alignItems: 'center',
        backgroundColor: theme.cinza1,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        justifyContent: 'flex-start',
        paddingHorizontal: 5
    },

    viewInputCheck: {
        alignItems: 'center',
        backgroundColor: theme.cinza1,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        height: 30,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },

    viewInputTitle: {
        alignItems: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'flex-start',
        width: "100%"
    },

    viewLista: {
        backgroundColor: theme.cinza1,
        borderRadius: 3,
        maxHeight: 150,
        position: 'static',
        width: "100%"
    },

    viewPrincipal: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        justifyContent: 'flex-start',
        width: '100%'
    },

    viewTextSelected: {
        alignItems: 'center',
        borderColor: theme.preto1,
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        minHeight: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },

    viewTextInputSelected: {
        alignItems: 'center',
        backgroundColor: theme.cinza1,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        minHeight: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },

    viewItemLista: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
})