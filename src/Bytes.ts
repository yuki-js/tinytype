import { baseOptions } from "./baseOptions";
import { TPrimitive } from "./TPrimitive";

type TBytes<N extends string> = TPrimitive<N> &
  Options & {
    type: "bytes";
  };

interface Options extends baseOptions {}
export function Bytes<N extends string>(name: N, options?: Options): TBytes<N> {
  return {
    name,
    type: "bytes",
    ...options,
  };
}
