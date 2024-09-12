import ParamPages from "../interface/ParamPages";
import { navigationRef } from "../refs/navigationRef";

export const navigateTo = <RouteName extends keyof ParamPages>(
    routeName: RouteName,
    params?: ParamPages[RouteName]
) => {
    if (navigationRef.current) {
        if (params) {
            navigationRef.current.navigate(routeName as any, params);
        } else {
            navigationRef.current.navigate(routeName as any);
        }
    }
};