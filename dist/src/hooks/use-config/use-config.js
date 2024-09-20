import { ONE_PASSWORD_REFERENCE } from "../../constants.js";
import { onePasswordAuthStrategy } from "../../core/index.js";
export const useConfig = ()=>{
    return {
        apiAuthStrategy: onePasswordAuthStrategy(ONE_PASSWORD_REFERENCE)
    };
};

//# sourceMappingURL=use-config.js.map