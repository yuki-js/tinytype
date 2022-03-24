import { TPrimitive } from "./TPrimitive";

export function Args<T extends TPrimitive[]>(...args: [...T]) {
  return args;
}
