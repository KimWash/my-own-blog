import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const extendedPrismaClient = () => {
  const prisma = new PrismaClient().$extends({
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
    },
  });

  return prisma;
};

export type ExtendedPrismaClient = ReturnType<typeof extendedPrismaClient>;

const prisma = global.prisma || extendedPrismaClient();
export default prisma;

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
