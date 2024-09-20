import { APP_NAME, APP_VERSION } from "../constants.js";
import { subcommands } from "cmd-ts";
import { account } from "./account.js";
export const app = subcommands({
    name: APP_NAME,
    version: APP_VERSION,
    cmds: {
        account
    }
});

//# sourceMappingURL=app.js.map