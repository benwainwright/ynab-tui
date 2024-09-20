export const createLogsMatcher = (output)=>{
    return {
        logOutput () {
            console.log(output);
        },
        should: {
            contain: (match)=>expect(output).toContain(match),
            not: {
                contain: (match)=>expect(output).not.toContain(match)
            }
        }
    };
};

//# sourceMappingURL=logs-matcher.js.map