import { API } from "ynab";
export const getApi = async (authStrategy)=>{
    const token = await authStrategy();
    return new API(token);
};

//# sourceMappingURL=get-api.js.map