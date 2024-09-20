export const createLogsMatcher = (output: string) => {
  return {
    logOutput() {
      console.log(output)
    },
    should: {
      contain: (match: string) => expect(output).toContain(match),
      not: {
        contain: (match: string) => expect(output).not.toContain(match),
      },
    },
  }
}
