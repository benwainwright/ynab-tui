import { useEffect, useState } from "react";
import { API } from "ynab";
import { useConfig } from "../index.js";
let apiCache;
export const useApi = ()=>{
    const [api, setApi] = useState(apiCache);
    const { apiAuthStrategy } = useConfig();
    useEffect(()=>{
        const asyncContext = async ()=>{
            const token = await apiAuthStrategy();
            const api = new API(token);
            apiCache = api;
            setApi(api);
        };
        if (!api) {
            asyncContext();
        }
    }, []);
    return {
        api
    };
};

//# sourceMappingURL=use-api.js.map