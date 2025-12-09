import { db } from "@/app/_lib/prisma";
import "server-only";

export const getTodayRevenue = async (): Promise<number> => {
  // Aqui obtemos o valor total da vendas no dia

  const todayRevenueQuery = `
    SELECT SUM("unitPrice" * "quantity") as "todayRevenue"
    FROM "SaleProduct"
    WHERE "createdAt" >= $1 AND "createdAt" <= $2;
  `;

  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

  const todayRevenue = await db.$queryRawUnsafe<{ todayRevenue: number }[]>(
    todayRevenueQuery,
    startOfDay,
    endOfDay,
  );

  return todayRevenue[0].todayRevenue;
};
