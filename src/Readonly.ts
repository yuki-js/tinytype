import { TPrimitive } from "./TPrimitive";

export type TReadonly<T extends TPrimitive> = T & {
  readonly: true;
};

export function Readonly<T extends TPrimitive>(arg: T): TReadonly<T> {
  return {
    ...arg,
    readonly: true,
  };
}
