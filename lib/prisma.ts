import { PrismaClient, Prisma } from "@prisma/client";
import {
  DefaultArgs,
  DynamicQueryExtensionCb,
  InternalArgs,
} from "@prisma/client/runtime/library";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

export interface Delegate<T> {
  aggregate(data: unknown): unknown;
  count(data: unknown): unknown;
  create(data: unknown): unknown;
  delete(data: unknown): unknown;
  deleteMany(data: unknown): unknown;
  findFirst(data: unknown): unknown;
  findMany(data: unknown): unknown;
  findUnique(data: unknown): unknown;
  update(data: unknown): unknown;
  updateMany(data: unknown): unknown;
  upsert(data: unknown): unknown;
}

function deleteExtension<T>(
  model: Delegate<T>,
  idFieldName: keyof T,
  deleteFlagFieldName: keyof T,
  deletedDateFieldName: keyof T
) {
  return {
    need: { [idFieldName]: true, [deleteFlagFieldName]: true },
    compute(data: Partial<T>) {
      return () => {
        model.update({
          where: { [idFieldName]: data[idFieldName] },
          data: {
            [deleteFlagFieldName]: true,
            [deletedDateFieldName]: new Date(),
          },
        });
      };
    },
  };
}

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;
const extendedPrismaClient = () => {
  const prisma = new PrismaClient();
  const extendedPrisma = prisma.$extends({
    query: {
      post: {
        async findMany({ model, operation, args, query }) {
          // findMany 조건에 is_deleted 추가
          args.where = { is_deleted: false, ...args.where };
          return query(args);
        },
      },
    },
    result: {
      media: {
        url: {
          needs: { id: true },
          compute(data) {
            const mediaId = data.id; // actual media id
            return `/api/media/${mediaId}/HIGH`;
          },
        },
      },
      post: {
        delete: deleteExtension(prisma.post, "id", "is_deleted", "delete_dt"),
      },
    },
  });

  return extendedPrisma;
};

export type ExtendedPrismaClient = ReturnType<typeof extendedPrismaClient>;

const prisma = global.prisma || extendedPrismaClient();
export default prisma;

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
