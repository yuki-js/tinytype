import { TNullable } from "./Nullable";

export type PrimitiveTypes = {
  string: string;
  int: number;
  bytes: Uint8Array;
  boolean: boolean;
};

type PrimitiveTypesUnion = keyof PrimitiveTypes;

export interface TPrimitive<N extends string = string> {
  type: PrimitiveTypesUnion;
  name: N;
}

type GetType<T> = T extends TPrimitive
  ? T extends TNullable<infer T>
    ? PrimitiveTypes[T["type"]] | null
    : PrimitiveTypes[T["type"]]
  : unknown;

export type ToType<T extends TPrimitive[]> = {
  [Index in keyof T]: GetType<T[Index]>;
};
