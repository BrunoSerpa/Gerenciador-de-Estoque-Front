import { Text, View } from "react-native";
import { styleDefault } from "../style";
import InputDefault from "../inputDefault";

interface Props {
    setFrete: (frete: string) => void;
    frete: string;
};

function BlocoFrete(blocoFrete: Props) {
    return (<View style={styleDefault.viewFrete}>
        <View style={styleDefault.tituloFrete}>
            <Text style={styleDefault.textFrete}>Frete</Text>
        </View>
        <View style={styleDefault.separador} />
        <View style={styleDefault.inputFrete}>
            <InputDefault
                placeholder="0,00"
                set={blocoFrete.setFrete}
                text={blocoFrete.frete}
                esquerda
                marcacao="R$"
            />
        </View>
        <View style={styleDefault.separador} />
    </View>);
};

export { InputDefault, BlocoFrete }