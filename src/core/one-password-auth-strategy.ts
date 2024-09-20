import { read } from "@1password/op-js";
import { AuthStrategy } from "@types";

export const onePasswordAuthStrategy = (
  secretReference: string
): AuthStrategy => {
  return async () => read.parse(secretReference);
};
