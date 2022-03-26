import { TPrimitive } from "./TPrimitive";

export type TNullable<T extends TPrimitive> = T & {
  nullable: true;
};

export function Nullable<T extends TPrimitive>(arg: T): TNullable<T> {
  return {
    ...arg,
    nullable: true,
  };
}
