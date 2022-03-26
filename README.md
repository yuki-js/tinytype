# tinytype

# What is this

This is a library to help you define arguments types in your code.
It will be good for RPC, etc.

This library does:

- Provides static argument type information for your typescript code
- Provides dynamic argument type information to runtime
- Provides documentation for your code and runtime
- Define constraints of the arguments

This library itself currently does not:

- Create RPC server
- Create RPC client
- Validate arguments as per the defined constraints.
- Encode/decode/pack/unpack data
- Define the transport protocol

# how to use

```
export const args = Args(Nullable(String("Argument 1")), Int("Argument 2"));

// args = [
//   { name: 'Argument 1', type: 'string', nullable: true },
//   { name: 'Argument 2', type: 'int', nullable: false }
// ]

type StaticArgs = ToType<typeof args>;

// StaticArgs = [string | null, number]
```
