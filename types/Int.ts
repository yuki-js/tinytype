import { TPrimitive } from "./TPrimitive";

type TInt = TPrimitive &
  Options & {
    type: "int";
  };

interface Options {
  default?: number;
  min?: number;
  max?: number;
}
export function Int(name: string, options?: Options): TInt {
  return {
    name,
    type: "int",
    nullable: false,
    ...options,
  };
}
