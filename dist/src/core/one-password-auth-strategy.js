import { read } from "@1password/op-js";
export const onePasswordAuthStrategy = (secretReference)=>{
    return async ()=>read.parse(secretReference);
};

//# sourceMappingURL=one-password-auth-strategy.js.map