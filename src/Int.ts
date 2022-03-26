import { baseOptions } from "./baseOptions";
import { TPrimitive } from "./TPrimitive";

type TInt<N extends string> = TPrimitive<N> &
  Options & {
    type: "int";
  };

interface Options extends baseOptions {
  default?: number;
  min?: number;
  max?: number;
}
export function Int<N extends string>(name: N, options?: Options): TInt<N> {
  return {
    name,
    type: "int",
    ...options,
  };
}
