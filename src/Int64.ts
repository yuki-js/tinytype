import { baseOptions } from "./baseOptions";
import { TPrimitive } from "./TPrimitive";

type TInt64<N extends string> = TPrimitive<N> &
  Options & {
    type: "int64";
  };

interface Options extends baseOptions {
  default?: bigint;
  min?: bigint;
  max?: bigint;
}
export function Int64<N extends string>(name: N, options?: Options): TInt64<N> {
  return {
    name,
    type: "int64",
    ...options,
  };
}
