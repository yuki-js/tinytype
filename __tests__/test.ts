import * as T from "../src";
import { assertType, TypeEq, TypeExtends } from "./utils/typeMatcher";

test("basic usage", () => {
  const t = T.Args(
    T.String("The String field", {
      description: "This is the string field.",
      regex: /^[a-zA-Z0-9]*$/,
    }),
    T.Int32("The Int32 field")
  );

  expect(t).toEqual([
    {
      name: "The String field",
      type: "string",
      description: "This is the string field.",
      regex: /^[a-zA-Z0-9]*$/,
    },
    {
      name: "The Int32 field",
      type: "int32",
    },
  ]);
  assertType<TypeEq<T.ToType<typeof t>, [string, number]>>();
});

test("empty set", () => {
  const t = T.Args();
  expect(t).toEqual([]);
  assertType<TypeEq<T.ToType<typeof t>, []>>();
});

test("one nullable string", () => {
  const t = T.Args(T.Nullable(T.String("The String field")));
  expect(t).toEqual([
    {
      name: "The String field",
      type: "string",
      nullable: true,
    },
  ]);
  assertType<TypeEq<T.ToType<typeof t>, [string | null]>>();
});

test("two arguments", () => {
  const t = T.Args(
    T.String("The String field", {
      description: "This is the string field.",
    }),
    T.Nullable(T.Int64("The Int64 field"))
  );
  expect(t).toEqual([
    {
      name: "The String field",
      type: "string",

      description: "This is the string field.",
    },
    {
      name: "The Int64 field",
      type: "int64",
      nullable: true,
    },
  ]);
  assertType<TypeEq<T.ToType<typeof t>, [string, bigint | null]>>();
});
test("two bytes", () => {
  const t = T.Args(
    T.Bytes("The Bytes field"),
    T.Nullable(
      T.Bytes("The Bytes field", {
        description: "This is the bytes field.",
      })
    )
  );
  expect(t).toEqual([
    {
      name: "The Bytes field",
      type: "bytes",
    },
    {
      name: "The Bytes field",
      type: "bytes",
      nullable: true,
      description: "This is the bytes field.",
    },
  ]);
  assertType<TypeEq<T.ToType<typeof t>, [Uint8Array, Uint8Array | null]>>();
});

test("statically check", () => {
  const t = T.Args(
    T.String("The String field", {
      description: "This is the string field.",
    }),
    T.Nullable(T.Int32("The Int32 field")),
    T.Bytes("Bytes field")
  );
  assertType<
    TypeExtends<
      typeof t,
      [
        {
          name: "The String field";
          type: "string";
        },
        {
          name: "The Int32 field";
          type: "int32";
          nullable: true;
        },
        {
          name: "Bytes field";
          type: "bytes";
        }
      ]
    >
  >();
  expect(t).toEqual([
    {
      name: "The String field",
      type: "string",
      description: "This is the string field.",
    },
    {
      name: "The Int32 field",
      type: "int32",
      nullable: true,
    },
    {
      name: "Bytes field",
      type: "bytes",
    },
  ]);
});

test("type object is TArg", () => {
  const t = T.Args(T.String("The String field"));
  assertType<TypeExtends<typeof t, T.TArg>>();
});

test("object type is translatable as expected 1", () => {
  const inArg = T.Args(T.String("The String field"));
  const outArg = T.Args(T.Boolean("Boolean will returned"));

  type RemoteFunction<I extends T.TArg, O extends T.TArg> = (
    ...args: T.ToType<I>
  ) => T.ToType<O>;
  interface RemoteProc<I extends T.TArg, O extends T.TArg> {
    inArg: I;
    outArg: O;
    func: RemoteFunction<I, O>;
  }
  const F: RemoteFunction<typeof inArg, typeof outArg> = ([arg0]) => {
    const isValid = arg0.length > 0;
    return [isValid];
  };
  const remoteProc: RemoteProc<typeof inArg, typeof outArg> = {
    inArg,
    outArg,
    func: F,
  };

  assertType<TypeEq<Parameters<typeof remoteProc.func>, [string]>>();
  assertType<TypeEq<ReturnType<typeof remoteProc.func>, [boolean]>>();
});

test("object type is translatable as expected 2", () => {
  type RemoteFunction<I extends T.TArg, O extends T.TArg> = (
    ...args: T.ToType<I>
  ) => Readonly<T.ToType<O>>;

  interface RemoteProc<I extends T.TArg, O extends T.TArg>
    extends RemoteFunction<I, O> {
    inArg: I;
    outArg: O;
  }

  function createFunc<I extends T.TArg, O extends T.TArg>(
    inArg: I,
    outArg: O,
    func: RemoteFunction<I, O>
  ): RemoteProc<I, O> {
    const remoteFunc = (...a: T.ToType<I>) => func(...a);
    remoteFunc.inArg = inArg;
    remoteFunc.outArg = outArg;
    return remoteFunc;
  }
  const remoteProc = createFunc(
    T.Args(T.String("The String field"), T.Nullable(T.Int64("Foo"))),
    T.Args(T.Boolean("Boolean will returned")),
    (arg0, arg1) => {
      assertType<TypeEq<typeof arg0, string>>();
      assertType<TypeEq<typeof arg1, bigint | null>>();
      const isValid = arg0.length > 0 && arg1 != null && arg1 > 1n;
      const returning = [isValid] as const;
      assertType<TypeEq<typeof returning, readonly [boolean]>>();
      return returning;
    }
  );

  assertType<TypeEq<Parameters<typeof remoteProc>, [string, bigint | null]>>();
  assertType<TypeEq<ReturnType<typeof remoteProc>, readonly [boolean]>>();

  assertType<
    TypeExtends<
      typeof remoteProc.inArg,
      [
        {
          name: "The String field";
          type: "string";
        },
        {
          name: "Foo";
          type: "int64";
          nullable: true;
        }
      ]
    >
  >();
  expect(remoteProc.inArg).toEqual([
    {
      name: "The String field",
      type: "string",
    },
    {
      name: "Foo",
      type: "int64",
      nullable: true,
    },
  ]);
});

test("static enum type", () => {
  const t = T.Args(T.Enum("The Enum field", ["a", "b"] as const));
  expect(t).toEqual([
    {
      name: "The Enum field",
      type: "enum",
      variants: ["a", "b"],
    },
  ]);
  assertType<TypeEq<T.ToType<typeof t>, ["a" | "b"]>>();
});

test("dynamic enum type", () => {
  const t = T.Args(T.Enum("The Enum field", ["a", "b"]));
  expect(t).toEqual([
    {
      name: "The Enum field",
      type: "enum",
      variants: ["a", "b"],
    },
  ]);
  assertType<TypeEq<T.ToType<typeof t>, [string]>>();
});
