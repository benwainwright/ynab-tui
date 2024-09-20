import { jsx as _jsx } from "react/jsx-runtime";
import { command, option, string } from "cmd-ts";
import { render } from "ink";
import { Account } from "../components/index.js";
export const account = command({
    name: 'account',
    args: {
        name: option({
            long: 'name',
            type: string
        })
    },
    handler: async (args)=>{
        const { waitUntilExit } = render(/*#__PURE__*/ _jsx(Account, {
            name: args.name
        }));
        await waitUntilExit();
    }
});

//# sourceMappingURL=account.js.map