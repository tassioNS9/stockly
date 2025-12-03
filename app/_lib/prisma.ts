// lib/prisma.ts

import { PrismaClient } from "@/app/generated/prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: ReturnType<typeof createPrismaClient> | undefined;
}

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

//const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const createPrismaClient = () => {
  return new PrismaClient({ adapter });
};
let prisma: ReturnType<typeof createPrismaClient>;

if (process.env.NODE_ENV !== "production") {
  prisma = createPrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
