import { NavigationContainer } from "@react-navigation/native";
import Routes from "../../routes";
import { Header } from "../../components";
import { navigationRef } from "../../refs/navigationRef";


export default function Principal() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Routes />
            <Header />
        </NavigationContainer>
    );
};