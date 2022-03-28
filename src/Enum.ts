import { baseOptions } from "./baseOptions";
import { TPrimitive } from "./TPrimitive";

export type TEnum<
  N extends string,
  V extends readonly string[]
> = TPrimitive<N> &
  Options & {
    type: "enum";
    variants: V;
  };

interface Options extends baseOptions {
  default?: string;
  regex?: RegExp;
}
export function Enum<N extends string, V extends readonly string[]>(
  name: N,
  variants: V,
  options?: Options
): TEnum<N, V> {
  return {
    name,
    type: "enum",
    variants,
    ...options,
  };
}
