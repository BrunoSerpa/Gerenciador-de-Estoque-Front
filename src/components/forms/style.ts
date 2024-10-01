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
    textErro: {
        color: theme.vermelho1,
        textAlign:  'center',
        ...textoStyle.texto1
    },
    textSucesso: {
        color: theme.preto1,
        textAlign:  'center',
        ...textoStyle.texto1
    }
});