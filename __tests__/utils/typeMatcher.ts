// inspired by https://qiita.com/kgtkr/items/2a8290d1b1314063a524

export type TypeEq<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T
>() => T extends B ? 1 : 2
  ? true
  : false;

export type TypeExtends<A, B> = A extends B ? true : false;

export function assertType<_T extends true>() {}
export function assertNotType<_T extends false>() {}
