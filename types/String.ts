import { TPrimitive } from "./TPrimitive";

type TString = TPrimitive &
  Options & {
    type: "string";
  };

interface Options {
  default?: string;
  regex?: RegExp;
}
export function String(name: string, options?: Options): TString {
  return {
    name,
    type: "string",
    nullable: false,
    ...options,
  };
}
