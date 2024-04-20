import {ExtendedPrismaClient} from './prisma'

declare global {
  namespace globalThis {
    var prisma: ExtendedPrismaClient;
  }
}
