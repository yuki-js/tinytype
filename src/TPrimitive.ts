import { TNullable } from "./Nullable";
import { TEnum } from "./Enum";

export type PrimitiveTypes = {
  string: string;
  int32: number;
  bytes: Uint8Array;
  boolean: boolean;
  int64: bigint;
  enum: string;
};

type PrimitiveTypesUnion = keyof PrimitiveTypes;

export interface TPrimitive<N extends string = string> {
  type: PrimitiveTypesUnion;
  name: N;
}

type GetType<T> = T extends TPrimitive ? UnwrapNullableType<T> : unknown;

type UnwrapNullableType<T extends TPrimitive> = T extends TNullable<infer T>
  ? UnwrapEnumType<T> | null
  : UnwrapEnumType<T>;

type GetPrimitiveType<T extends TPrimitive> = PrimitiveTypes[T["type"]];

type UnwrapEnumType<T extends TPrimitive> = T extends TEnum<string, infer V>
  ? V[number]
  : GetPrimitiveType<T>;

export type ToType<T extends TPrimitive[]> = {
  [Index in keyof T]: GetType<T[Index]>;
};
