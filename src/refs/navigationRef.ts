import { NavigationContainerRef } from "@react-navigation/native";
import { createRef } from "react";
import ParamPages from "../context/ParamPages";

export const navigationRef = createRef<NavigationContainerRef<ParamPages>>();