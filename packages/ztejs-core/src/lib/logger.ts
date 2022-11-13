export interface ExecutorLogger<Input> {
  log(input: Input): void;
}

export const createConsoleDataLogger = <Input, Output = Input>(
  parser = (input: Input): Input | Output => input
): ExecutorLogger<Input> => ({
  log: (input: Input) => console.info(parser(input)),
});
