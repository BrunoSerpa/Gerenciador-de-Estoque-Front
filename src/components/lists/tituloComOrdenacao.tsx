import { Pressable, StyleProp, Text, TextStyle } from "react-native";
import { styleTitulo } from "./style";

interface Props {
    titulo: string;
    coluna: string;
    style: StyleProp<TextStyle>;
    setOrdemCrescente: (crescente: boolean) => void;
    setOrdenarPor: (ordem: any) => void;
    ordemCrescente: boolean;
    ordenarPor: string;
}

export default function TituloComOrdenacao({
    titulo,
    coluna,
    style,
    setOrdemCrescente,
    setOrdenarPor,
    ordemCrescente,
    ordenarPor,
}: Props) {
    const handleOrdenacao = (coluna: any) => {
        if (ordenarPor === coluna) {
            setOrdemCrescente(!ordemCrescente);
        } else {
            setOrdenarPor(coluna);
            setOrdemCrescente(true);
        }
    };
    return (
        <Pressable onPress={() => handleOrdenacao(coluna)} style={[styleTitulo.viewTitulo, style]}>
            <Text style={[styleTitulo.textTitulo, { margin: 0 }]}>
                {titulo}
            </Text>
            <Text style={[styleTitulo.textTitulo, { margin: 0 }]}>
                {ordenarPor === coluna && (ordemCrescente ? " ▲" : " ▼")}
            </Text>
        </Pressable>
    );
}