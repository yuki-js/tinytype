import { baseOptions } from "./baseOptions";
import { TPrimitive } from "./TPrimitive";

type TInt32<N extends string> = TPrimitive<N> &
  Options & {
    type: "int32";
  };

interface Options extends baseOptions {
  default?: number;
  min?: number;
  max?: number;
}
export function Int32<N extends string>(name: N, options?: Options): TInt32<N> {
  return {
    name,
    type: "int32",
    ...options,
  };
}
