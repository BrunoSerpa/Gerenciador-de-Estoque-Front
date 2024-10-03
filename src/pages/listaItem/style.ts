import { StyleSheet } from "react-native";
import { theme } from "../../styles";

export const styleLista = StyleSheet.create({
    modalBase: {
        alignItems: 'center',
        backgroundColor: theme.transparente,
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
    modal: {
        width: '94%',
        height: '80%',
        backgroundColor: theme.branco1
    }
});