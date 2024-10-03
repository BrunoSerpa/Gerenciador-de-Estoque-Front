import { Pressable, Image } from "react-native";
import { styleDefault } from "../style";

interface Props {
    fechar: () => void;
}

export default function FecharModal(fecharModal: Props) {
    return (
        <Pressable
            onPress={fecharModal.fechar}
            style={styleDefault.viewFechar}
        >
            <Image
                source={require("../../../../assets/close.png")}
                style={styleDefault.fecharIcon}
            />
        </Pressable>
    );
}