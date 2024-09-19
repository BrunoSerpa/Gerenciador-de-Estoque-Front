import { StyleSheet } from "react-native";
import { textoStyle, theme } from "../../styles";

export const styleHeader = StyleSheet.create({
    Header: {
        top:7,
        left: 20,
        position: 'absolute',
        zIndex: 2
    },
    ViewLinks: {
        backgroundColor: theme.marrom1,
        borderRadius: 7,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 12,
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: 'auto',
    },
    Divisor: {
        backgroundColor: theme.branco2,
        marginTop: 5,
        marginBottom: 5,
        height: 2        
    },
    Text: {
        ...textoStyle.texto1,
        color: theme.branco2
    },
    ViewImage: {
        /* top: 20,
        left: 20,
        position: 'absolute', */
    },
    Image: {
        height: 25,
        width: 25,
    },
})