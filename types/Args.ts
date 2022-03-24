import { TPrimitive } from "./TPrimitive";
export type TArg = TPrimitive[];
export function Args<T extends TPrimitive[]>(...args: [...T]): TArg {
  return args;
}
