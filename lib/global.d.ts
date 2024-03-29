import { PrismaClient } from "@prisma/client";
import { ExtendedPrismaClient } from "db";

declare global {
  namespace globalThis {
    var prisma: ExtendedPrismaClient;
  }
}
