import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./src/refs/navigationRef";
import Routes from "./src/routes";
import { Header } from "./src/components";

export default function App() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Routes />
            <Header />
        </NavigationContainer>
    )
}