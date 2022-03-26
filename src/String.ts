import { baseOptions } from "./baseOptions";
import { TPrimitive } from "./TPrimitive";

type TString<N extends string> = TPrimitive<N> &
  Options & {
    type: "string";
  };

interface Options extends baseOptions {
  default?: string;
  regex?: RegExp;
}
export function String<N extends string>(
  name: N,
  options?: Options
): TString<N> {
  return {
    name,
    type: "string",
    ...options,
  };
}
