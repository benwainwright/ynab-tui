import { API } from "ynab";
import { AuthStrategy } from "@types";

export const getApi = async (authStrategy: AuthStrategy): Promise<API> => {
  const token = await authStrategy();
  return new API(token);
};
