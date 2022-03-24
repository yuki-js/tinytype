import { TNullable } from "./Nullable";

export type PrimitiveTypes = {
  string: string;
  int: number;
  bytes: Buffer;
};

type PrimitiveTypesUnion = keyof PrimitiveTypes;

export type TPrimitive = {
  type: PrimitiveTypesUnion;
  name: string;
  nullable: boolean;
};

type GetType<T> = T extends TPrimitive
  ? T extends TNullable<unknown>
    ? PrimitiveTypes[T["type"]] | null
    : PrimitiveTypes[T["type"]]
  : unknown;

export type ToType<T extends TPrimitive[]> = {
  [Index in keyof T]: GetType<T[Index]>;
};
