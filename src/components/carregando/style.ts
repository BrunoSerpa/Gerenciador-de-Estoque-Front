import { StyleSheet } from "react-native";
import { textoStyle, theme } from "../../styles";


export const styleCarregando = StyleSheet.create({
    viewCarregando: {
        backgroundColor: theme.cinza1,
        display: 'flex',
        justifyContent: 'space-around',
        height: "90%",
        width: '100%',
    },
    textCarregando: {
        color: theme.preto1,
        textAlign: 'center',
        ...textoStyle.texto4,
    }
})