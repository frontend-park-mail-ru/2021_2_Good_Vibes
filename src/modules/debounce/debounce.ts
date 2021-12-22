type FunctionType = (...args: unknown[]) => void;

let newArgs: unknown[];

const debounce = (f: FunctionType, context: unknown, ms: number): FunctionType => {
  let isCooldown = false;
  return function func(...args: unknown[]) {
    newArgs = args;

    if (isCooldown) return;
    isCooldown = true;

    setTimeout(() => {
      f.call(context, ...newArgs);
      isCooldown = false;
    }, ms);
  };
};

export default debounce;
