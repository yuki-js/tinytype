import { baseOptions } from "./baseOptions";
import { TPrimitive } from "./TPrimitive";

type TBoolean<N extends string> = TPrimitive<N> &
  Options & {
    type: "boolean";
  };

interface Options extends baseOptions {}
export function Boolean<N extends string>(
  name: N,
  options?: Options
): TBoolean<N> {
  return {
    name,
    type: "boolean",
    ...options,
  };
}
