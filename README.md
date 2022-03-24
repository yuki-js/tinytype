# tinytype

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
