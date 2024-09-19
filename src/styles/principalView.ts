import { StyleSheet } from "react-native"
import theme from "./theme";

const principalView = StyleSheet.create({
    PrincipalView:{
        backgroundColor: theme.branco1,
        width: '100%',
        minHeight: '100%'
    },
    titleRoute: {
        backgroundColor: theme.marrom1,
        color: theme.branco2,
        fontSize: 25,
        height: 40,
        textAlign: 'center',
        width: '100%'
    }
});

export default principalView;