import { Modal, Text, View } from "react-native";
import { principalView } from "../../styles";
import FecharModal from "../../components/inputs/fecharModal";
import { styleLista } from "./style";
import ListaItens from "../../components/lists/listaItens";

interface Props {
    id_produto: number;
    nome_produto: string;
    fecharModal: () => void;
}
export default function ListaItem(item: Props) {
    return (
        <Modal onTouchEndCapture={item.fecharModal} transparent={true}>
            <View style={styleLista.modalBase}>
                <View style={styleLista.modal}>
                    <Text style={principalView.titleRoute}>Lista de Itens ({item.nome_produto})</Text>
                    <FecharModal fechar={item.fecharModal} />
                    <ListaItens id_produto={item.id_produto} />
                </View>
            </View>
        </Modal>
    );
};