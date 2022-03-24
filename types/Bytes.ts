import { TPrimitive } from "./TPrimitive";

type TBytes = TPrimitive &
  Options & {
    type: "bytes";
  };

interface Options {}
export function Bytes(name: string, options?: Options): TBytes {
  return {
    name,
    type: "bytes",
    nullable: false,
    ...options,
  };
}
