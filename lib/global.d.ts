import { Mongoose } from "mongoose"

declare global {
  namespace globalThis {
    var _mongo: Promise<Mongoose>
  };
}